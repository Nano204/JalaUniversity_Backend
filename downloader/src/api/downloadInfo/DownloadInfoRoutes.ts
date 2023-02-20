import { Router } from "express";
import DownloadInfoController from "./DownloadInfoController";

const router = Router();
const downloadInfoController = new DownloadInfoController();

// router.get("/search", async (req, res, next) => {
//     downloadInfoController
//         .findAccountById(req, res, next)
//         .then((response) => response)
//         .catch(next);
// });

router.get("/", async (req, res, next) => {
    downloadInfoController
        .findAllRegistries(req, res, next)
        .then((response) => response)
        .catch(next);
});

export default router;
