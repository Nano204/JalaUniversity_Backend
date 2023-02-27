import { Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { FileMapper } from "../database/mappers/FileMapper";
import { File, FileEntity, FileRequestInfo } from "../database/model/File";
import DownloadInfoService from "./DownloadInfoService";

export default class FileService {
    private repository: Repository<FileEntity>;
    private mapToDBEntity: FileMapper["toDBEntity"];

    constructor() {
        this.repository = AppDataSource.getRepository(FileEntity);
        this.mapToDBEntity = new FileMapper().toDBEntity;
    }

    async createNew(fileRequestInfo: FileRequestInfo) {
        const file = new File(fileRequestInfo);
        const newFile = this.mapToDBEntity(file);
        await this.repository.save(newFile);
        return newFile;
    }

    async findOrCreate(fileRequestInfo: FileRequestInfo) {
        const findedFile = await this.repository.findOne({
            where: { id: fileRequestInfo.id },
        });
        if (findedFile) {
            return findedFile;
        }
        const file = new File(fileRequestInfo);
        const newFile = this.mapToDBEntity(file);
        await this.repository.save(newFile);
        return newFile;
    }

    async findAll() {
        return await this.repository.find();
    }

    async findById(id: string) {
        return await this.repository.findOne({ relations: ["uris"], where: { id } });
    }

    async update(file: FileEntity) {
        return await this.repository.save(file);
    }

    async deleteById(id: string) {
        const downloadInfoService = new DownloadInfoService();
        await downloadInfoService.setDeleteStatusOnFileAtAllRegistries(id);
        await downloadInfoService.sendAllInfoToStats();
        return await this.repository.delete({ id });
    }

    async resetTodayDownloadsSize(file: FileEntity) {
        const dateNow = new Date(new Date().toUTCString());
        const todayStart = dateNow.setHours(0, 0, 0, 0);
        const lastDownloadDate = file.lastDownloadDate;
        if (lastDownloadDate < todayStart) {
            file.todayTotalDownloadSize = 0;
            file.todayTotalDownloadsCount = 0;
            return await this.update(file);
        }
        return file;
    }
}
