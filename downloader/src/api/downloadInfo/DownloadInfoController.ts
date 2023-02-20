import { NextFunction, Request, Response } from "express";
import { DownloadInfoMapper } from "../../database/mappers/DownloadsInfoMapper";
import DownloadInfoService from "../../services/DownloadInfoService";

export default class DownloadInfoController {
    private downloadInfoService: DownloadInfoService;
    private mapToDTO: DownloadInfoMapper["toDTO"];

    constructor() {
        this.downloadInfoService = new DownloadInfoService();
        this.mapToDTO = new DownloadInfoMapper().toDTO;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // async findRegistriesByQuery(req: Request, res: Response, next: NextFunction) {
    //     const { id } = req.params;
    //     const account = await this.accountService.findById(id);
    //     if (!account) {
    //         throw new NotFoundException();
    //     }
    //     return res.status(200).json(this.mapToDTO(account));
    // }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findAllRegistries(req: Request, res: Response, next: NextFunction) {
        const registries = await this.downloadInfoService.findAll();
        if (registries.length) {
            const registriesDTO = registries.map((registry) => this.mapToDTO(registry));
            return res.status(200).json(registriesDTO);
        }
        return res.status(200).json(registries);
    }
}
