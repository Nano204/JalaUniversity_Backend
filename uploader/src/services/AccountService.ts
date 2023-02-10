import { Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { AccountMapper } from "../database/mappers/AccountMapper";
import {
    Account,
    AccountEntity,
    CreateAccountRequestInfo,
} from "../database/model/Account";

export default class AccountService {
    private repository: Repository<AccountEntity>;
    private mapToDBEntity: AccountMapper["toDBEntity"];

    constructor() {
        this.repository = AppDataSource.getMongoRepository(AccountEntity);
        this.mapToDBEntity = new AccountMapper().toDBEntity;
    }

    async createNew(accountRequestInfo: CreateAccountRequestInfo) {
        const account = new Account(accountRequestInfo);
        const newAccount = this.mapToDBEntity(account);
        await this.repository.save(newAccount);
        return newAccount;
    }

    async findAll() {
        return await this.repository.find();
    }

    async findById(id: string) {
        return await this.repository.findOneBy({ id });
    }

    async findByEmail(email: string) {
        return await this.repository.findOneBy({ email });
    }

    async update(account: AccountEntity) {
        return await this.repository.save(account);
    }

    async deleteById(id: string) {
        return await this.repository.delete({ id });
    }
}
