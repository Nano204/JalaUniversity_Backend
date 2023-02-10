import { NextFunction, Request, Response } from "express";
import { FileMapper } from "../../database/mappers/FileMapper";
import { FileRequestInfo } from "../../database/model/File";
import FileService from "../../services/FileService";
import { BadRequestException, NotFoundException } from "../errorHandler/Exceptions";

export default class FileController {
    private fileService: FileService;
    private mapToDTO: FileMapper["toDTO"];

    constructor() {
        this.fileService = new FileService();
        this.mapToDTO = new FileMapper().toDTO;
    }
    
    async createNewFile(req: Request, res: Response, next: NextFunction) {
        if (!req.file) {
            return next(
                new BadRequestException(
                    "Requires an attached file to perform this action"
                )
            );
        }
        const { originalname: name, size, mimetype: mimeType, path } = req.file;
        const requestInfo = { name, size, mimeType, path };
        const newFile = await this.fileService.createNew(requestInfo);
        return res.status(202).json(this.mapToDTO(newFile));
    }

    async findFileById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const file = await this.fileService.findById(id);
        if (!file) {
            return next(new NotFoundException());
        }
        return res.status(200).json(this.mapToDTO(file));
    }

    async findFilesByQuery(req: Request, res: Response, next: NextFunction) {
        const { name, size, mimeType } = req.query;
        const requestInfo: FileRequestInfo = {
            name: String(name),
            size: Number(size),
            mimeType: String(mimeType),
        };
        const files = await this.fileService.findManyByQuery(requestInfo);
        if (!files.length) {
            return next(new NotFoundException());
        }
        const filesDTO = files.map((file) => this.mapToDTO(file));
        return res.status(200).json(filesDTO);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findAllFiles(req: Request, res: Response, next: NextFunction) {
        const files = await this.fileService.findAll();
        if (files.length) {
            const filesDTO = files.map((file) => this.mapToDTO(file));
            return res.status(200).json(filesDTO);
        }
        return res.status(200).json(files);
    }

    async updateFile(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const { name } = req.body;
        if (!id) {
            return next(
                new BadRequestException("Must indicate Id of the file to perform update")
            );
        }
        const file = await this.fileService.findById(id);
        if (!file) {
            return next(new NotFoundException());
        }
        const updateFile = await this.fileService.update({
            ...file,
            name,
        });
        return res.status(200).json(this.mapToDTO(updateFile));
    }

    async deleteFile(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const deleted = await this.fileService.deleteById(id);
        if (!deleted.affected) {
            return next(new NotFoundException());
        }
        return res.status(200).json(deleted);
    }
}