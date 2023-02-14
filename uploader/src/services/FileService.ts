import { Collection, GridFSBucket, ObjectId } from "mongodb";
import fs from "fs";
import { database, gridFSBucket } from "../database/DBSource";
import { FileMapper } from "../database/mappers/FileMapper";
import {
    FileRequestInfo,
    File,
    FileEntity,
    OnDriveFile,
    FileQueryInfo,
} from "../database/model/File";
import AccountService from "./AccountService";
import GoogleAPIService from "./googleapi/GoogleAPIService";
import { AccountEntity } from "../database/model/Account";
import request from "request";
export default class FileService {
    private collection: Collection;
    private accountService: AccountService;
    private mapToDBEntity: FileMapper["toDBEntity"];
    private bucket: GridFSBucket;
    private tempFilePath: string;

    constructor() {
        this.collection = database.collection("file_entity");
        this.accountService = new AccountService();
        this.mapToDBEntity = new FileMapper().toDBEntity;
        this.bucket = gridFSBucket;
        this.tempFilePath = "./src/services/temp/outputFile";
    }

    public async fromGridFSToAllDrives(id: string) {
        const file = await this.findById(id);
        if (file) {
            const tempDBReference = file.tempDBReference.toString();
            await this.downloadTempFileByReference(tempDBReference, async () => {
                file.onDriveFile = await this.uploadTempFileToAllDrives(file);
                file.status = "Uploaded";
                await this.update(file);
            });
            return await this.update({ ...file, status: "Replicating..." });
        }
    }

    private async uploadTempFileToAllDrives(file: FileEntity): Promise<OnDriveFile[]> {
        const fileId = file._id.toString();
        const accounts = await this.accountService.findAll();
        const onDriveFileList: OnDriveFile[] = [];
        await Promise.all(
            accounts.map(async (account) => {
                const onDriveFile = await this.uploadTempFileToDrive(account, fileId);
                const accountId = account._id.toString();
                if (onDriveFile) {
                    const postObject = {
                        fileOriginId: fileId,
                        name: file.name,
                        size: file.size,
                        mimeType: file.mimeType,
                        accountOriginId: accountId,
                        onDriveId: onDriveFile.onDriveId,
                        webContentLink: onDriveFile.webContentLink,
                    };
                    request.post(
                        "http://localhost:3002/downloads/",
                        { json: postObject },
                        (error) => {
                            if (error) {
                                throw new Error("Making post request failed");
                            }
                            // if (!error && response.statusCode == 202) {
                            //     console.log(body);
                            // }
                        }
                    );
                    return onDriveFileList.push(onDriveFile);
                }
            })
        );
        this.deleteTempFile();
        if (onDriveFileList && onDriveFileList.length) {
            return onDriveFileList;
        }
        throw new Error("Could not upload the file");
    }

    private async uploadTempFileToDrive(
        account: AccountEntity,
        fileId: string
    ): Promise<OnDriveFile> {
        const file = await this.findById(fileId);
        if (file) {
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
                return onDriveFile;
            }
            throw new Error("Could not upload the file");
        }
        throw new Error("Could not upload the file");
    }

    private async deleteFromAllDrives(id: string) {
        const _id = new ObjectId(id);
        const file = await this.collection.findOne({ _id });
        const onDriveFileList = file?.onDriveFile;
        onDriveFileList?.map(async (onlineFileData: OnDriveFile) => {
            const account = await this.accountService.findById(onlineFileData.accountId);
            if (account) {
                const googleAPIService = new GoogleAPIService(account.googleDriveKey);
                googleAPIService.deleteFile(onlineFileData.onDriveId);
            }
        });
    }

    async createNew(fileRequestInfo: FileRequestInfo) {
        const file = new File(fileRequestInfo);
        const newFile = this.mapToDBEntity(file);
        const storedConfirmation = await this.collection.insertOne(newFile);
        return this.findById(storedConfirmation.insertedId.toString());
    }

    async findAll(): Promise<FileEntity[]> {
        return (await this.collection.find().toArray()) as FileEntity[];
    }

    async findById(id: string): Promise<FileEntity | null> {
        const _id = new ObjectId(id);
        const document = await this.collection.findOne({ _id });
        if (document) {
            return document as FileEntity;
        }
        return null;
    }

    async downloadTempFileByReference(reference: string, cb: () => Promise<void>) {
        const _id = new ObjectId(reference);
        const document = await this.bucket.find({ _id }).toArray();
        if (document.length) {
            this.bucket
                .openDownloadStream(_id)
                .pipe(fs.createWriteStream(this.tempFilePath))
                .once("finish", () => {
                    cb();
                });
        }
    }

    async deleteTempFile() {
        fs.unlink(this.tempFilePath, (err) => {
            if (err) {
                throw err;
            }
        });
    }

    async findManyByQuery(queryIfo: FileQueryInfo): Promise<FileEntity[]> {
        const query = { ...queryIfo };
        return (await this.collection.find(query).toArray()) as FileEntity[];
    }

    async update(file: FileEntity) {
        const updateDoc = { $set: { ...file } };
        const updatedFile = await this.collection.findOneAndUpdate(
            { _id: file._id },
            updateDoc,
            {
                upsert: false,
            }
        );
        if (updatedFile.value) {
            const _id = updatedFile.value._id;
            return await this.collection.findOne({ _id });
        }
        throw new Error("Unexpected server error");
    }

    async deleteById(id: string) {
        await this.deleteFromAllDrives(id);
        const _id = new ObjectId(id);
        const document = await this.collection.findOne({ _id });
        if (document) {
            const _id = new ObjectId(document.tempDBReference);
            await this.bucket.delete(_id);
        }
        return await this.collection.deleteOne({ _id });
    }
}
