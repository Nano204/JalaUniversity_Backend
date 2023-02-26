import { Router } from "express";
import DownloadInfoController from "./DownloadInfoController";

const router = Router();
const downloadInfoController = new DownloadInfoController();

router.get("/", async (req, res, next) => {
    downloadInfoController
        .findAllRegistries(req, res, next)
        .then((response) => response)
        .catch(next);
});

export default router;
