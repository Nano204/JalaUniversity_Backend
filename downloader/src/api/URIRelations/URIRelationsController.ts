import { NextFunction, Request, Response } from "express";
import { FileMapper } from "../../database/mappers/FileMapper";
import FileService from "../../services/FileService";
import URIService from "../../services/URIService";
import { NotFoundException } from "../errorHandler/Exceptions";

export default class URIRelationsController {
    private fileService: FileService;
    private uriService: URIService;
    private mapToDTO: FileMapper["toDTO"];

    constructor() {
        this.fileService = new FileService();
        this.uriService = new URIService();
        this.mapToDTO = new FileMapper().toDTO;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createNewRelation(req: Request, res: Response, next: NextFunction) {
        const relation = await this.uriService.createRelation(req.body);
        return res.status(202).json(relation);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findURIAvailable(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const relation = await this.uriService.findURIWithAvailableAccount(id);
        if (!relation) {
            throw new NotFoundException();
        }
        return res.status(200).json(relation);
    }
}
