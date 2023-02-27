import { LessThan, Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { AccountMapper } from "../database/mappers/AccountMapper";
import { Account, AccountEntity, AccountRequestInfo } from "../database/model/Account";
import DownloadInfoService from "./DownloadInfoService";

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
        const downloadInfoService = new DownloadInfoService();
        await downloadInfoService.setDeleteStatusOnAccountAtAllRegistries(id);
        await downloadInfoService.sendAllInfoToStats();
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

    async findFirstAvailable() {
        const account = (await this.findAvailables())[0];
        const availableAccount = await this.resetTodayDownloadsSize(account);
        return availableAccount;
    }

    async resetTodayDownloadsSize(account: AccountEntity) {
        const dateNow = new Date(new Date().toUTCString());
        const todayStart = dateNow.setHours(0, 0, 0, 0);
        const lastDownloadDate = account.lastDownloadDate;
        if (lastDownloadDate < todayStart) {
            account.lastDateTotalDownloadSize = 0;
            account.lastDateTotalDownloadsCount = 0;
            return await this.update(account);
        }
        return account;
    }
}
