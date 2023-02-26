import { Response, Router } from "express";
import ReportController from "./ReportController";

const router = Router();
const reportController = new ReportController();

router.get("/:type", async (req, res, next) => {
    reportController
        .findReportByType(req, res, next)
        .then((response: Response) => response)
        .catch(next);
});

router.get("/", async (req, res, next) => {
    reportController
        .findAllReports(req, res, next)
        .then((response: Response) => response)
        .catch(next);
});

export default router;
