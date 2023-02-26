import { Repository } from "typeorm";
import { AppDataSource } from "../database/DBSource";
import { ReportEntity } from "../database/model/Report";

export default class ReportService {
    private repository: Repository<ReportEntity>;

    constructor() {
        this.repository = AppDataSource.getRepository(ReportEntity);
    }

    async createNew(type: string, data: string) {
        const report = { type, report: data };
        return await this.repository.save(report);
    }

    async findByType(type: string) {
        return await this.repository.findOne({ where: { type } });
    }

    async updateOrCreateByType(type: string, data: string) {
        const findedReport = await this.findByType(type);
        if (!findedReport) {
            return this.createNew(type, data);
        }
        findedReport.report = data;
        return this.update(findedReport);
    }

    async findAll() {
        return await this.repository.find();
    }

    async update(report: ReportEntity) {
        return await this.repository.save(report);
    }

    async deleteByType(type: string) {
        return await this.repository.delete({ type });
    }
}
