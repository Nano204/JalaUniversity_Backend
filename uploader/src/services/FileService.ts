import { Collection, GridFSBucket, ObjectId } from "mongodb";
import { Repository } from "typeorm";
import fs from "fs";
import { AppDataSource, database, gridFSBucket } from "../database/DBSource";
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

export default class FileService {
    // private repository: Repository<FileEntity>;
    private collection: Collection;
    private accountService: AccountService;
    private mapToDBEntity: FileMapper["toDBEntity"];
    private bucket: GridFSBucket;

    constructor() {
        this.collection = database.collection("file_entity");
        this.accountService = new AccountService();
        this.mapToDBEntity = new FileMapper().toDBEntity;
        this.bucket = gridFSBucket;
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
        const file = await this.collection.findOne({ id });
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
        await this.collection.insertOne(newFile);
        return newFile;
    }

    async findAll(): Promise<FileEntity[]> {
        return (await this.collection.find().toArray()) as FileEntity[];
    }

    async findById(id: string): Promise<FileEntity | void> {
        const document = await this.collection.findOne({ fsId: new ObjectId(id) });
        if (document) {
            return document as FileEntity;
        }
    }

    async findBinaryById(id: string) {
        const _id = new ObjectId(id);
        const document = await this.bucket.find({ _id }).toArray();
        if (document.length) {
            console.log("start");
            this.bucket
                .openDownloadStream(_id)
                .pipe(fs.createWriteStream("./src/services/outputFile"));
            console.log("end");
            return document[0];
        }
    }

    async findManyByQuery(queryIfo: FileQueryInfo): Promise<FileEntity[]> {
        const query = { ...queryIfo };
        return (await this.collection.find(query).toArray()) as FileEntity[];
    }

    async update(file: FileEntity) {
        const updateDoc = { $set: { ...file } };
        return await this.collection.findOneAndUpdate({ _id: file._id }, updateDoc, {
            upsert: false,
        });
    }

    async deleteById(id: string) {
        await this.deleteFromAllDrives(id);
        const _id = new ObjectId(id);
        await this.bucket.delete(_id);
        return await this.collection.deleteOne({ fsId: _id });
    }
}
