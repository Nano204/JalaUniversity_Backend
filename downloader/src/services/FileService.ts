import { Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { FileMapper } from "../database/mappers/FileMapper";
import { File, FileEntity, FileRequestInfo } from "../database/model/File";

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
        return await this.repository.delete({ id });
    }
}
