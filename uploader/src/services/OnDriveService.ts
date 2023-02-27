import { AccountEntity } from "../database/model/Account";
import { FileEntity, OnDriveFile } from "../database/model/File";
import env from "../env";
import AccountService from "./AccountService";
import FileService from "./FileService";
import GoogleAPIService from "./googleapi/GoogleAPIService";
import { Rabbit, TOPICS } from "./rabbitService/rabbit";
import logger from "jet-logger";
import { Point } from "@influxdata/influxdb-client";
import InfluxDbService from "./influxDbService/InfluxDbService";

type ToDownloadRequest = {
    file: FileEntity;
    account: AccountEntity;
    onDriveFile: OnDriveFile;
};

export type toDownloadObject = {
    fileId: string;
    name: string;
    size: number;
    mimeType: string;
    accountId: string;
    onDriveId: string;
    webContentLink: string;
};

export class OnDriveService {
    private tempFilePath: string;

    constructor() {
        this.tempFilePath = env.TEMPFILE_PATH as string;
    }

    private sendUploadedSignal(file: FileEntity, account: AccountEntity) {
        const accountId = account._id.toString();
        const point = new Point("file_uploaded")
            .tag("filename", file.name)
            .tag("account", accountId)
            .intField("size", file.size)
            .timestamp(new Date());
        const influxDbService = new InfluxDbService();
        influxDbService.writeApi.writePoints([point]);
    }

    async deleteAllFilesFromDriveAccount(account: AccountEntity) {
        const rabbitService = new Rabbit();
        try {
            const googleAPIService = new GoogleAPIService(account.googleDriveKey);
            await googleAPIService.clearAccount();
            await rabbitService.publishOnExchange(TOPICS.toExecuteOnQueue);
        } catch (error) {
            logger.err(error);
            await rabbitService.publishOnExchange(TOPICS.toExecuteOnQueue);
        }
    }

    async deleteFileFromAllDrivesAccounts(id: string) {
        try {
            const fileService = new FileService();
            const accountService = new AccountService();
            const file = await fileService.findById(id);
            const onDriveFileList = file?.onDriveFile;
            onDriveFileList?.map(async (onlineFileData: OnDriveFile) => {
                const account = await accountService.findById(onlineFileData.accountId);
                if (account) {
                    const googleAPIService = new GoogleAPIService(account.googleDriveKey);
                    await googleAPIService.deleteFile(onlineFileData.onDriveId);
                }
            });
        } catch (error) {
            logger.err(error, true);
        }
    }

    private async uploadTempFileToDriveAccount(
        account: AccountEntity,
        file: FileEntity
    ): Promise<OnDriveFile | undefined> {
        try {
            const path = this.tempFilePath;
            const googleAPIService = new GoogleAPIService(account.googleDriveKey);
            const onlineFile = await googleAPIService.uploadFile({
                ...file,
                path,
            });
            if (onlineFile) {
                const onDriveFile: OnDriveFile = {
                    accountId: account._id.toString(),
                    onDriveId: onlineFile.id,
                    webContentLink: onlineFile.webContentLink,
                };
                this.sendUploadedSignal(file, account);
                return onDriveFile;
            }
            throw new Error("Could not upload the file");
        } catch (error) {
            logger.err(error, true);
        }
    }

    public async uploadFileToAllDrives(fileId: string): Promise<void> {
        const rabbitService = new Rabbit();
        try {
            const accountService = new AccountService();
            const fileService = new FileService();
            const file = (await fileService.findById(fileId)) as FileEntity;
            const tempDBReference = file.tempDBReference.toString();
            await fileService.extractFileFromGridFSByReference(tempDBReference);
            const accounts = await accountService.findAll();
            for await (const account of accounts) {
                const accountId = account._id.toString();
                const alreadyOnAccount = file.onDriveFile.some(
                    (onDriveInfo) => onDriveInfo.accountId == accountId
                );
                if (!alreadyOnAccount) {
                    const onDriveFile = await this.uploadTempFileToDriveAccount(
                        account,
                        file
                    );
                    if (!onDriveFile) {
                        throw new Error("Error at uploading file");
                    }
                    const toDownloadRequest = { file, account, onDriveFile };
                    await this.sendToDownloaderURI(toDownloadRequest);
                    file.onDriveFile.push(onDriveFile);
                }
            }
            file.status = "uploaded";
            await fileService.update(file);
            await fileService.deleteTempFile();
            await rabbitService.publishOnExchange(TOPICS.toExecuteOnQueue);
        } catch (error) {
            logger.err(error, true);
            await rabbitService.publishOnExchange(TOPICS.toExecuteOnQueue);
        }
    }

    public async allFilesfromGridFSToDrive(accountId: string) {
        const rabbitService = new Rabbit();
        try {
            const accountService = new AccountService();
            const fileService = new FileService();
            const account = await accountService.findById(accountId);
            if (!account) {
                throw new Error("Account not found or deleted while procedure");
            }
            const files = await fileService.findAll();
            if (files.length) {
                for await (const file of files) {
                    const tempDBReference = file.tempDBReference.toString();
                    const condition = file.onDriveFile.some(
                        (onDriveInfo) => onDriveInfo.accountId == accountId
                    );
                    if (!condition) {
                        await fileService.extractFileFromGridFSByReference(
                            tempDBReference
                        );
                        const onDriveFile = (await this.uploadTempFileToDriveAccount(
                            account,
                            file
                        )) as OnDriveFile;
                        const toDownloadRequest = { file, account, onDriveFile };
                        await this.sendToDownloaderURI(toDownloadRequest);
                        file.onDriveFile.push(onDriveFile);
                        await fileService.update(file);
                        try {
                            await fileService.deleteTempFile();
                        } catch (error) {
                            logger.err(error);
                        }
                    }
                }
            }
            await rabbitService.publishOnExchange(TOPICS.toExecuteOnQueue);
        } catch (err) {
            logger.imp(err, true);
            await rabbitService.publishOnExchange(TOPICS.toExecuteOnQueue);
        }
    }

    private async sendToDownloaderURI(toDownloadRequest: ToDownloadRequest) {
        try {
            const rabbitService = new Rabbit();
            const { file, account, onDriveFile } = toDownloadRequest;
            const accountId = account._id.toString();
            const fileId = file._id.toString();
            const toDownloadObject = {
                fileId,
                name: file.name,
                size: file.size,
                mimeType: file.mimeType,
                accountId,
                onDriveId: onDriveFile.onDriveId,
                webContentLink: onDriveFile.webContentLink,
            };
            await rabbitService.publishOnExchange(
                TOPICS.sendToDownloadCreateFile,
                toDownloadObject
            );
            return toDownloadObject;
        } catch (err) {
            logger.imp(err, true);
        }
    }
}
