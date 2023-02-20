import { LessThan, Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { AccountMapper } from "../database/mappers/AccountMapper";
import { Account, AccountEntity, AccountRequestInfo } from "../database/model/Account";

export default class AccountService {
    private repository: Repository<AccountEntity>;
    private mapToDBEntity: AccountMapper["toDBEntity"];

    constructor() {
        this.repository = AppDataSource.getRepository(AccountEntity);
        this.mapToDBEntity = new AccountMapper().toDBEntity;
    }

    async createNew(accountRequestInfo: AccountRequestInfo) {
        const accountInfo = new Account(accountRequestInfo);
        const newAccountInfo = this.mapToDBEntity(accountInfo);
        await this.repository.save(newAccountInfo);
        return newAccountInfo;
    }

    async findOrCreate(accountRequestInfo: AccountRequestInfo) {
        const findedAccount = await this.repository.findOne({
            where: { id: accountRequestInfo.id },
        });
        if (findedAccount) {
            return findedAccount;
        }
        const accountInfo = new Account(accountRequestInfo);
        console.log(accountInfo);
        const newAccountInfo = this.mapToDBEntity(accountInfo);
        await this.repository.save(newAccountInfo);
        return newAccountInfo;
    }

    async findAll() {
        return await this.repository.find();
    }

    async findById(id: string) {
        return await this.repository.findOne({
            relations: ["uris", "uris.file"],
            where: { id },
        });
    }

    async update(accountInfo: AccountEntity) {
        return await this.repository.save(accountInfo);
    }

    async deleteById(id: string) {
        return await this.repository.delete({ id });
    }

    async findAvailables() {
        const dateNow = new Date(new Date().toUTCString());
        const todayStart = dateNow.setHours(0, 0, 0, 0);
        let accounts = await this.repository.find({
            where: { lastDownloadDate: LessThan(todayStart) },
        });
        if (!accounts.length) {
            accounts = await this.repository.find({
                order: { lastDateTotalDownloadSize: "ASC" },
            });
        }
        return accounts;
    }

    // async chargeDownloadSize(id: string, size: number) {
    //     const account = await this.repository.findOneBy({ id });
    //     if (account) {
    //         account.lastDateDownloadSize += size;
    //         return await this.repository.save(account);
    //     }
    // }

    // async resetDownloadSize(id: string) {
    //     const account = await this.repository.findOneBy({ id });
    //     if (account) {
    //         account.lastDateDownloadSize = 0;
    //         return await this.repository.save(account);
    //     }
    // }
}
