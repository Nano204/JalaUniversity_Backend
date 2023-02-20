import { Router } from "express";
import FileController from "./FileController";

const router = Router();
const fileController = new FileController();

router.get("/:id", async (req, res, next) => {
    fileController
        .findFileById(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.get("/", async (req, res, next) => {
    fileController
        .findAllFiles(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.post("/", async (req, res, next) => {
    fileController
        .createNewFile(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.delete("/:id", async (req, res, next) => {
    fileController
        .deleteFile(req, res, next)
        .then((response) => response)
        .catch(next);
});

export default router;
