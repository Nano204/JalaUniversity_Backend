import { MoreThanOrEqual, Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { DownloadInfoMapper } from "../database/mappers/DownloadsInfoMapper";
import { AccountEntity } from "../database/model/Account";
import {
    DownloadInfo,
    DownloadInfoEntity,
    RegistryRequestInfo,
} from "../database/model/DownloadInfo";
import { FileEntity } from "../database/model/File";
import { URIEntity } from "../database/model/URI";
import AccountService from "./AccountService";
import FileService from "./FileService";

export type CreateRegistryRequest = {
    file: FileEntity;
    account: AccountEntity;
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
        const { file, account } = requestInfo;
        account.lastDownloadDate = new Date().getTime();
        account.lastDateTotalDownloadSize += file.size;
        this.accountService.update(account);
        const entityRequestInfo = this.createEntityRequestInfo(requestInfo);
        const registry = new DownloadInfo(entityRequestInfo);
        return await this.repository.save(this.mapToDBEntity(registry));
    }

    createEntityRequestInfo(requestInfo: CreateRegistryRequest) {
        const registryRequestInfo: RegistryRequestInfo = {
            fileId: requestInfo.file.id,
            fileName: requestInfo.file.name,
            size: requestInfo.file.size,
            mimeType: requestInfo.file.mimeType,
            accountId: requestInfo.account.id,
            uriId: requestInfo.uri.id,
            onDriveId: requestInfo.uri.onDriveId,
            webContentLink: requestInfo.uri.webContentLink,
        };
        return registryRequestInfo;
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
        return await this.repository.find();
    }
}
