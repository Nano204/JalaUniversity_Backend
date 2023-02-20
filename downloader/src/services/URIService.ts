import { Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { AccountEntity } from "../database/model/Account";
import { FileEntity } from "../database/model/File";
import { URI, URIEntity } from "../database/model/URI";
import AccountService from "./AccountService";
import DownloadInfoService from "./DownloadInfoService";
import FileService from "./FileService";

export type CreateRelationRequest = {
    fileId: string;
    accountId: string;
    name: string;
    size: number;
    mimeType: string;
    onDriveId: string;
    webContentLink: string;
};

export type AssociateFileAccountRequest = {
    file: FileEntity;
    accountInfo: AccountEntity;
    webContentLink: string;
    onDriveId: string;
};

export default class URIService {
    private repository: Repository<URIEntity>;
    private accountService: AccountService;
    private fileService: FileService;
    private downloadInfoService: DownloadInfoService;

    constructor() {
        this.repository = AppDataSource.getRepository(URIEntity);
        this.accountService = new AccountService();
        this.fileService = new FileService();
        this.downloadInfoService = new DownloadInfoService();
    }

    async createNew(requestInfo: CreateRelationRequest) {
        const { fileId, accountId, name, size, mimeType, onDriveId, webContentLink } =
            requestInfo;
        const fileRequestInfo = { id: fileId, name, size, mimeType };
        const file = await this.fileService.findOrCreate(fileRequestInfo);
        const accountRequestInfo = { id: accountId };
        const account = await this.accountService.findOrCreate(accountRequestInfo);
        const uriRequest = { file, account, onDriveId, webContentLink };
        const uri = new URI(uriRequest);
        const newURI = await this.repository.save(uri);
        return newURI;
    }

    async findURIByFileIdAndAccountId(fileId: string, accountId: string) {
        const uri = (await this.repository.findOne({
            relations: ["file", "account"],
            where: { file: { id: fileId }, account: { id: accountId } },
        })) as URIEntity;
        const downloadInfoRequest = { fileId, accountId, uri };
        await this.downloadInfoService.createNew(downloadInfoRequest);
        return uri;
    }

    async findURIAvailableByFileId(fileId: string) {
        const account = (await this.accountService.findAvailables())[0];
        const uri = (await this.findURIByFileIdAndAccountId(
            fileId,
            account.id
        )) as URIEntity;
        return uri;
    }
}
