import { NextFunction, Request, Response } from "express";
import { ReportMapper } from "../../database/mappers/ReportMapper";
import ReportService from "../../services/ReportService";
import { NotFoundException } from "../errorHandler/Exceptions";

export default class ReportController {
    private reportService: ReportService;
    private mapToDTO: ReportMapper["toDTO"];

    constructor() {
        this.reportService = new ReportService();
        this.mapToDTO = new ReportMapper().toDTO;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findReportByType(req: Request, res: Response, next: NextFunction) {
        const { type } = req.params;
        const report = await this.reportService.findByType(type);
        if (!report) {
            throw new NotFoundException();
        }
        return res.status(200).json(this.mapToDTO(report));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findAllReports(req: Request, res: Response, next: NextFunction) {
        const reports = await this.reportService.findAll();
        if (!reports.length) {
            throw new NotFoundException();
        }
        const reportsDTO = reports.map((report) => this.mapToDTO(report));
        return res.status(200).json(reportsDTO);
    }
}
