import { MoreThanOrEqual, Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { DownloadInfoMapper } from "../database/mappers/DownloadsInfoMapper";
import { AccountEntity } from "../database/model/Account";
import { DownloadInfo, DownloadInfoEntity } from "../database/model/DownloadInfo";
import { FileEntity } from "../database/model/File";
import { URIEntity } from "../database/model/URI";
import AccountService from "./AccountService";
import FileService from "./FileService";

export type CreateRegistryRequest = {
    fileId: string;
    accountId: string;
    uri: URIEntity;
};

export default class DownloadInfoService {
    private repository: Repository<DownloadInfoEntity>;
    private accountService: AccountService;
    private fileService: FileService;
    private mapToDBEntity: DownloadInfoMapper["toDBEntity"];

    constructor() {
        this.repository = AppDataSource.getRepository(DownloadInfoEntity);
        this.accountService = new AccountService();
        this.fileService = new FileService();
        this.mapToDBEntity = new DownloadInfoMapper().toDBEntity;
    }

    async createNew(requestInfo: CreateRegistryRequest) {
        const { fileId, accountId, uri } = requestInfo;
        const file = (await this.fileService.findById(fileId)) as FileEntity;
        const account = (await this.accountService.findById(accountId)) as AccountEntity;
        account.lastDownloadDate = new Date().getTime();
        account.lastDateTotalDownloadSize += file.size;
        this.accountService.update(account);
        const registryRequestInfo = { file, account, uri };
        const registry = new DownloadInfo(registryRequestInfo);
        return await this.repository.save(this.mapToDBEntity(registry));
    }

    async findTodayRegistries() {
        const dateNow = new Date(new Date().toUTCString());
        const todayStart = dateNow.setHours(0, 0, 0, 0);
        return await this.repository.find({
            relations: ["file", "account", "uri"],
            where: { date: MoreThanOrEqual(todayStart) },
        });
    }

    async findAll() {
        return await this.repository.find({ relations: ["file", "account", "uri"] });
    }
}
