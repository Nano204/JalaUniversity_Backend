import { Collection, GridFSBucket, ObjectId } from "mongodb";
import fs from "fs";
import { database, gridFSBucket } from "../database/DBSource";
import { FileMapper } from "../database/mappers/FileMapper";
import { FileRequestInfo, File, FileEntity, FileQueryInfo } from "../database/model/File";
import { Rabbit, TOPICS } from "./rabbitService/rabbit";
import env from "../env";

export default class FileService {
    private collection: Collection;
    private mapToDBEntity: FileMapper["toDBEntity"];
    private bucket: GridFSBucket;
    private tempFilePath: string;

    constructor() {
        this.collection = database.collection("file_entity");
        this.mapToDBEntity = new FileMapper().toDBEntity;
        this.bucket = gridFSBucket;
        this.tempFilePath = env.TEMPFILE_PATH as string;
    }

    async createNew(fileRequestInfo: FileRequestInfo) {
        const file = new File(fileRequestInfo);
        const newFile = this.mapToDBEntity(file);
        const storedConfirmation = await this.collection.insertOne(newFile);
        const id = storedConfirmation.insertedId.toString();
        const rabbitService = new Rabbit();
        await rabbitService.publishOnExchange(TOPICS.toUploadFileCreate, id);
        return this.findById(id);
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

    async findManyByQuery(queryIfo: FileQueryInfo): Promise<FileEntity[]> {
        const query = { ...queryIfo };
        return (await this.collection.find(query).toArray()) as FileEntity[];
    }

    async update(file: FileEntity) {
        const updateDoc = { $set: { ...file } };
        const updatedConfirmation = await this.collection.findOneAndUpdate(
            { _id: file._id },
            updateDoc,
            { upsert: false }
        );
        if (updatedConfirmation.value) {
            const _id = updatedConfirmation.value._id;
            const updatedFile = (await this.collection.findOne({ _id })) as FileEntity;
            if (file.name != updatedFile.name) {
                const updatePayload = { id: updatedFile._id, ...updatedFile };
                const rabbitService = new Rabbit();
                await rabbitService.publishOnExchange(
                    TOPICS.sendToDownloadUpdateFile,
                    updatePayload
                );
            }
            return updatedFile;
        }
        throw new Error("Unexpected server error");
    }

    async deleteById(id: string) {
        // await this.deleteFileFromAllDrives(id);
        const _id = new ObjectId(id);
        const document = await this.collection.findOne({ _id });
        if (document) {
            const _id = new ObjectId(document.tempDBReference);
            await this.bucket.delete(_id);
        }
        const rabbitService = new Rabbit();
        await rabbitService.publishOnExchange(TOPICS.sendToDownloadDeleteFile, id);
        return await this.collection.deleteOne({ _id });
    }

    async extractFileFromGridFSByReference(reference: string) {
        const _id = new ObjectId(reference);
        const document = await this.bucket.find({ _id }).toArray();
        await new Promise<void>((resolve) => {
            if (document.length) {
                this.bucket
                    .openDownloadStream(_id)
                    .pipe(fs.createWriteStream(this.tempFilePath))
                    .once("finish", async () => {
                        resolve();
                    });
            }
        });
    }

    async deleteTempFile() {
        fs.unlink(this.tempFilePath, (err) => {
            if (err) {
                throw err;
            }
        });
    }
}
