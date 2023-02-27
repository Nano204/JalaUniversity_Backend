import { ObjectId } from "mongodb";
import { Collection } from "mongodb";
import { database } from "../database/DBSource";
import { AccountMapper } from "../database/mappers/AccountMapper";
import {
    Account,
    AccountEntity,
    CreateAccountRequestInfo,
} from "../database/model/Account";
import FileService from "./FileService";
import { Rabbit, TOPICS } from "./rabbitService/rabbit";

export default class AccountService {
    private collection: Collection;
    private mapToDBEntity: AccountMapper["toDBEntity"];

    constructor() {
        this.collection = database.collection("account_entity");
        this.collection.createIndex({ googleDriveKey: 1 }, { unique: true });
        this.collection.createIndex({ email: 1 }, { unique: true });
        this.mapToDBEntity = new AccountMapper().toDBEntity;
    }

    async createNew(accountRequestInfo: CreateAccountRequestInfo) {
        const account = new Account(accountRequestInfo);
        const accountEntity = this.mapToDBEntity(account);
        const accountConfirm = await this.collection.insertOne(accountEntity);
        const accountId = accountConfirm.insertedId.toString();
        const rabbitService = new Rabbit();
        await rabbitService.publishOnExchange(TOPICS.toUploadAccountCreate, accountId);
        return this.findById(accountId);
    }

    async findAll() {
        return (await this.collection.find().toArray()) as AccountEntity[];
    }

    async findById(id: string) {
        const _id = new ObjectId(id);
        return (await this.collection.findOne({ _id })) as AccountEntity;
    }

    async findByEmail(email: string) {
        return (await this.collection.findOne({ email })) as AccountEntity;
    }

    async update(account: AccountEntity) {
        const updateDoc = { $set: { ...account } };
        const updatedFile = await this.collection.findOneAndUpdate(
            { _id: account._id },
            updateDoc,
            {
                upsert: false,
            }
        );
        if (updatedFile.value) {
            const _id = updatedFile.value._id;
            return await this.collection.findOne({ _id });
        }
        throw new Error("Unexpected server error");
    }

    public async deleteAccountReferencesForAllFiles(accountId: string) {
        const fileService = new FileService();
        const files = await fileService.findAll();
        for await (const file of files) {
            file.onDriveFile = file.onDriveFile.filter((onDriveReference) => {
                if (onDriveReference && onDriveReference.accountId) {
                    return onDriveReference.accountId != accountId;
                } else {
                    return false;
                }
            });
            await fileService.update(file);
        }
    }

    async deleteById(id: string) {
        const rabbitService = new Rabbit();
        const account = await this.findById(id);
        const _id = new ObjectId(id);
        await this.deleteAccountReferencesForAllFiles(id);
        await rabbitService.publishOnExchange(TOPICS.toUploadAccountDelete, account);
        await rabbitService.publishOnExchange(TOPICS.sendToDownloadDeleteAccount, id);
        return await this.collection.deleteOne({ _id });
    }
}
