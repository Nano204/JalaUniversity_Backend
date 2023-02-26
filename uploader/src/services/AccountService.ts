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
import GoogleAPIService from "./googleapi/GoogleAPIService";
import { Rabbit, TOPICS } from "./rabbitService/rabbit";

export default class AccountService {
    private collection: Collection;
    private mapToDBEntity: AccountMapper["toDBEntity"];
    private rabbitService: Rabbit;

    constructor() {
        this.collection = database.collection("account_entity");
        this.collection.createIndex({ googleDriveKey: 1 }, { unique: true });
        this.collection.createIndex({ email: 1 }, { unique: true });
        this.mapToDBEntity = new AccountMapper().toDBEntity;
        this.rabbitService = new Rabbit();
    }

    async createNew(accountRequestInfo: CreateAccountRequestInfo) {
        const account = new Account(accountRequestInfo);
        const accountEntity = this.mapToDBEntity(account);
        const accountConfirm = await this.collection.insertOne(accountEntity);
        const accountId = accountConfirm.insertedId.toString();
        await this.rabbitService.publishOnExchange(TOPICS.toUploadAccountCreate, accountId);
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

    async deleteAllFilesFromDrive(account: AccountEntity) {
        const googleAPIService = new GoogleAPIService(account.googleDriveKey);
        await googleAPIService.clearAccount();
    }

    async deleteById(id: string) {
        const account = await this.findById(id);
        await this.deleteAllFilesFromDrive(account);
        const fileService = new FileService();
        fileService.deleteReferencesFromAccount(account);
        const _id = new ObjectId(id);
        await this.rabbitService.publishOnExchange(
            TOPICS.sendToDownloadDeleteAccount,
            id
        );
        return await this.collection.deleteOne({ _id });
    }
}
