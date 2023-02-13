import { Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { AccountInfoMapper } from "../database/mappers/AccountInfoMapper";
import {
    AccountInfo,
    AccountInfoEntity,
    AccountInfoRequest,
    AccountState,
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

    async findAll() {
        return await this.repository.find();
    }

    async findManyByState(state: AccountState) {
        return await this.repository.find({ where: { state } });
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
