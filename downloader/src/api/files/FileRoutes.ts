import { Router } from "express";
import FileController from "./FileController";

const router = Router();
const fileController = new FileController();

router.get("/search", async (req, res, next) => {
    fileController
        .findFilesByQuery(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.get("/:id", async (req, res, next) => {
    fileController
        .findFileById(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.post("/", async (req, res, next) => {
    fileController
        .createNewFile(req, res, next)
        .then((response) => response)
        .catch(next);
});

export default router;
