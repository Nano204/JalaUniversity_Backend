import { ReportDTO, ReportEntity } from "../model/Report";

export class ReportMapper {
    toDTO(report: ReportEntity): ReportDTO {
        const reportDTO: ReportDTO = new ReportDTO();
        reportDTO.id = report.id;
        reportDTO.type = report.type;
        reportDTO.report = JSON.parse(report.report);
        return reportDTO;
    }
}
