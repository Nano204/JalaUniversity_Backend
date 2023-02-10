import { Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { FileMapper } from "../database/mappers/FileMapper";
import { FileRequestInfo, File, FileEntity, OnDriveFile } from "../database/model/File";
import AccountService from "./AccountService";
import GoogleAPIService from "./googleapi/GoogleAPIService";

export default class FileService {
    private repository: Repository<FileEntity>;
    private accountService: AccountService;
    private mapToDBEntity: FileMapper["toDBEntity"];

    constructor() {
        this.repository = AppDataSource.getMongoRepository(FileEntity);
        this.accountService = new AccountService();
        this.mapToDBEntity = new FileMapper().toDBEntity;
    }

    private async uploadToAllDrives(
        fileRequestInfo: FileRequestInfo
    ): Promise<OnDriveFile[]> {
        const accounts = await this.accountService.findAll();
        const onDriveFileList: OnDriveFile[] = [];
        await Promise.all(
            accounts.map(async (account) => {
                const googleAPIService = new GoogleAPIService(account.googleDriveKey);
                const onlineFile = await googleAPIService.uploadFile(fileRequestInfo);
                if (onlineFile) {
                    const onDriveFile: OnDriveFile = {
                        accountId: account.id,
                        onDriveId: onlineFile.id,
                        webContentLink: onlineFile.webContentLink,
                    };
                    return onDriveFileList.push(onDriveFile);
                }
            })
        );
        if (onDriveFileList && onDriveFileList.length) {
            return onDriveFileList;
        }
        throw new Error("Could not upload the file");
    }

    private async deleteFromAllDrives(id: string) {
        const file = await this.repository.findOneBy({ id });
        const onDriveFileList = file?.onDriveFile;
        onDriveFileList?.map(async (onlineFileData) => {
            const account = await this.accountService.findById(onlineFileData.accountId);
            if (account) {
                const googleAPIService = new GoogleAPIService(account.googleDriveKey);
                googleAPIService.deleteFile(onlineFileData.onDriveId);
            }
        });
    }

    async createNew(fileRequestInfo: FileRequestInfo) {
        const file = new File(fileRequestInfo);
        file.onDriveFile = await this.uploadToAllDrives(fileRequestInfo);
        const newFile = this.mapToDBEntity(file);
        await this.repository.save(newFile);
        return newFile;
    }

    async findAll() {
        return await this.repository.find();
    }

    async findById(id: string) {
        return await this.repository.findOneBy({ id });
    }

    async findManyByQuery(requestInfo: FileRequestInfo) {
        return await this.repository.find({ where: { ...requestInfo } });
    }

    async update(file: FileEntity) {
        return await this.repository.save(file);
    }

    async deleteById(id: string) {
        await this.deleteFromAllDrives(id);
        return await this.repository.delete({ id });
    }
}
