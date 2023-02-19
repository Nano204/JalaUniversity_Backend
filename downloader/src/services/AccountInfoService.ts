import { LessThan, Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { AccountInfoMapper } from "../database/mappers/AccountInfoMapper";
import {
    AccountInfo,
    AccountInfoEntity,
    AccountInfoRequest,
} from "../database/model/AccountInfo";

export default class AccountInfoService {
    private repository: Repository<AccountInfoEntity>;
    private mapToDBEntity: AccountInfoMapper["toDBEntity"];

    constructor() {
        this.repository = AppDataSource.getRepository(AccountInfoEntity);
        this.mapToDBEntity = new AccountInfoMapper().toDBEntity;
    }

    async createNew(accountRequestInfo: AccountInfoRequest) {
        const accountInfo = new AccountInfo(accountRequestInfo);
        const newAccountInfo = this.mapToDBEntity(accountInfo);
        await this.repository.save(newAccountInfo);
        return newAccountInfo;
    }

    async findOrCreate(accountRequestInfo: AccountInfoRequest) {
        const findedAccount = await this.repository.findOne({
            where: { accountOriginId: accountRequestInfo.accountOriginId },
        });
        if (findedAccount) {
            return findedAccount;
        }
        const accountInfo = new AccountInfo(accountRequestInfo);
        const newAccountInfo = this.mapToDBEntity(accountInfo);
        await this.repository.save(newAccountInfo);
        return newAccountInfo;
    }

    async findAvailable() {
        const dateNow = new Date(new Date().toUTCString());
        const restartCountDate = dateNow.setHours(0, 0, 0, 0);
        let accounts = await this.repository.find({
            where: { lastDownloadDate: LessThan(restartCountDate) },
        });
        if (!accounts.length) {
            accounts = await this.repository.find({
                order: { lastDateDownloadSize: "ASC" },
            });
        }
        return accounts;
    }

    async chargeDownloadSize(id: string, size: number) {
        const account = await this.repository.findOneBy({ id });
        if (account) {
            account.lastDateDownloadSize += size;
            return await this.repository.save(account);
        }
    }

    async resetDownloadSize(id: string) {
        const account = await this.repository.findOneBy({ id });
        if (account) {
            account.lastDateDownloadSize = 0;
            return await this.repository.save(account);
        }
    }

    async findAll() {
        return await this.repository.find();
    }

    async findById(id: string) {
        return await this.repository.findOneBy({ id });
    }

    async update(accountInfo: AccountInfoEntity) {
        return await this.repository.save(accountInfo);
    }

    async deleteById(id: string) {
        return await this.repository.delete({ id });
    }
}
