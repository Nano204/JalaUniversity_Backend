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
import { Rabbit, TOPICS } from "./rabbit-service/rabbit";

export type CreateRegistryRequest = {
    file: FileEntity;
    account: AccountEntity;
    uri: URIEntity;
};

export default class DownloadInfoService {
    private repository: Repository<DownloadInfoEntity>;
    private mapToDBEntity: DownloadInfoMapper["toDBEntity"];

    constructor() {
        this.repository = AppDataSource.getRepository(DownloadInfoEntity);
        this.mapToDBEntity = new DownloadInfoMapper().toDBEntity;
    }

    async createNew(requestInfo: CreateRegistryRequest) {
        const accountService = new AccountService();
        const fileService = new FileService();
        const { file, account } = requestInfo;
        const date = new Date().getTime();
        account.lastDownloadDate = date;
        account.lastDateTotalDownloadSize += file.size;
        account.totalDownloadSize += file.size;
        account.totalDownloadsCount += 1;
        account.lastDateTotalDownloadsCount += 1;
        accountService.update(account);
        file.lastDownloadDate = date;
        file.todayTotalDownloadSize += file.size;
        file.totalDownloadSize += file.size;
        file.totalDownloadsCount += 1;
        file.todayTotalDownloadsCount += 1;
        fileService.update(file);
        const entityRequestInfo = this.createEntityRequestInfo(requestInfo);
        const registry = new DownloadInfo(entityRequestInfo);
        const newRegistry = await this.repository.save(this.mapToDBEntity(registry));
        this.sendAllInfoToStats();
        return newRegistry;
    }

    async sendAllInfoToStats() {
        const rabbitService = new Rabbit();
        const registers = await this.findAll();
        return rabbitService.publishOnExchange(
            TOPICS.sendToStatsCreateReport,
            JSON.stringify(registers)
        );
    }

    private createEntityRequestInfo(requestInfo: CreateRegistryRequest) {
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

    async update(registry: DownloadInfoEntity) {
        return await this.repository.save(registry);
    }

    async setDeleteStatusOnAccountAtAllRegistries(accountId: string) {
        const registries = await this.repository.find({ where: { accountId } });
        for await (const registry of registries) {
            registry.accountStatus = "Deleted";
            await this.update(registry);
        }
    }

    async setDeleteStatusOnFileAtAllRegistries(fileId: string) {
        const registries = await this.repository.find({ where: { fileId } });
        for await (const registry of registries) {
            registry.fileStatus = "Deleted";
            await this.update(registry);
        }
    }
}
