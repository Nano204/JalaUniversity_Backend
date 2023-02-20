import { NextFunction, Request, Response } from "express";
import { URIMapper } from "../../database/mappers/URIMapper";
import URIService from "../../services/URIService";
import { NotFoundException } from "../errorHandler/Exceptions";

export default class URIRelationsController {
    private uriService: URIService;
    private mapToDTO: URIMapper["toDTO"];

    constructor() {
        this.uriService = new URIService();
        this.mapToDTO = new URIMapper().toDTO;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createNewURI(req: Request, res: Response, next: NextFunction) {
        const uri = await this.uriService.createNew(req.body);
        return res.status(202).json(this.mapToDTO(uri));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findURIAvailable(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const uri = await this.uriService.findURIAvailableByFileId(id);
        if (!uri) {
            throw new NotFoundException("The file was not found or must still on replicating stage");
        }
        return res.status(200).json(this.mapToDTO(uri));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async deleteURIById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const uri = await this.uriService.deleteById(id);
        if (!uri) {
            throw new NotFoundException();
        }
        return uri;
    }
}
