import { Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { AccountInfoEntity } from "../database/model/AccountInfo";
import { FileEntity } from "../database/model/File";
import { URI } from "../database/model/URI";
import AccountInfoService from "./AccountInfoService";
import FileService from "./FileService";

export type CreateRelationRequest = {
    fileOriginId: string;
    name: string;
    size: number;
    mimeType: string;
    accountOriginId: string;
    onDriveId: string;
    webContentLink: string;
};

export type AssociateFileAccountRequest = {
    file: FileEntity;
    accountInfo: AccountInfoEntity;
    webContentLink: string;
    onDriveId: string;
};

export default class URIService {
    private repository: Repository<URI>;
    private accountInfoService: AccountInfoService;
    private fileService: FileService;

    constructor() {
        this.repository = AppDataSource.getRepository(URI);
        this.accountInfoService = new AccountInfoService();
        this.fileService = new FileService();
    }

    async createRelation(requestInfo: CreateRelationRequest) {
        const {
            fileOriginId,
            name,
            size,
            mimeType,
            accountOriginId,
            onDriveId,
            webContentLink,
        } = requestInfo;
        const fileRequestInfo = { fileOriginId, name, size, mimeType };
        const file = await this.fileService.findOrCreate(fileRequestInfo);
        const accountInfo = await this.accountInfoService.findOrCreate({
            accountOriginId,
        });
        file.accountsInfo.push(accountInfo);
        await this.fileService.update(file);
        return await this.associateFileAccount({
            file,
            accountInfo,
            onDriveId,
            webContentLink,
        });
    }

    async associateFileAccount(requestInfo: AssociateFileAccountRequest) {
        const { file, accountInfo, webContentLink, onDriveId } = requestInfo;
        file.accountsInfo.push(accountInfo);
        await this.fileService.update(file);
        const URI = await this.repository.findOne({
            where: {
                accountId: accountInfo.id,
                fileId: file.id,
            },
        });
        if (URI) {
            URI.webContentLink = webContentLink;
            URI.onDriveId = onDriveId;
            await this.repository.save(URI);
        }
        return this.findURIByFileOriginIdAndAccountId(file.fileOriginId, accountInfo.id);
    }

    async findURIByFileOriginIdAndAccountId(fileId: string, accountId: string) {
        const file = await this.fileService.findByIdWithSpecificAccount(
            fileId,
            accountId
        );
        const uri = await this.repository.findOne({
            where: { fileId: file?.id, accountId },
        });
        const fileWithUri = { ...file, uri };
        return fileWithUri;
    }

    async findURIWithAvailableAccount(fileId: string) {
        const accounts = await this.accountInfoService.findAvailable();
        if (accounts.length) {
            const uri = await this.findURIByFileOriginIdAndAccountId(
                fileId,
                accounts[0].id
            );
            await this.accountInfoService.chargeDownloadSize(
                accounts[0].id,
                uri.size || 0
            );
            return uri;
        }
    }
}
