import { Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { URIMapper } from "../database/mappers/URIMapper";
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
    private mapToDBEntity: URIMapper["toDBEntity"];

    constructor() {
        this.repository = AppDataSource.getRepository(URIEntity);
        this.mapToDBEntity = new URIMapper().toDBEntity;
    }

    async createNew(requestInfo: CreateRelationRequest) {
        const fileService = new FileService();
        const accountService = new AccountService();
        const { fileId, accountId, name, size, mimeType, onDriveId, webContentLink } =
            requestInfo;
        const fileRequestInfo = { id: fileId, name, size, mimeType };
        const file = await fileService.findOrCreate(fileRequestInfo);
        const accountRequestInfo = { id: accountId };
        const account = await accountService.findOrCreate(accountRequestInfo);
        const uriRequest = { file, account, onDriveId, webContentLink };
        const uri = new URI(uriRequest);
        const newURI = await this.repository.save(this.mapToDBEntity(uri));
        return newURI;
    }

    async findURIByFileId(fileId: string) {
        const uri = await this.repository.find({ where: { file: { id: fileId } } });
        return uri;
    }

    async findURIByFileIdAndAccountId(file: FileEntity, account: AccountEntity) {
        const downloadInfoService = new DownloadInfoService();
        const uri = (await this.repository.findOne({
            relations: ["file", "account"],
            where: { file: { id: file.id }, account: { id: account.id } },
        })) as URIEntity;
        if (!uri) {
            return uri;
        }
        const downloadInfoRequest = { file, account, uri };
        await downloadInfoService.createNew(downloadInfoRequest);
        return uri;
    }

    async findURIAvailableByFileId(fileId: string) {
        const fileService = new FileService();
        const accountService = new AccountService();
        const account = await accountService.findFirstAvailable();
        const file = await fileService.findById(fileId);
        if (account && file) {
            const uri = (await this.findURIByFileIdAndAccountId(
                file,
                account
            )) as URIEntity;
            return uri;
        }
    }
}
