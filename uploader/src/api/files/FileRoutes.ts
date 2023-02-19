import { Router } from "express";
import FileController from "./FileController";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import env from "../../env";

const storage = new GridFsStorage({
    url: `${env.DATABASE_URI}/${env.DATABASE_NAME}`,
    file: (req, file) => {
        return new Promise((resolve) => {
            const filename = file.originalname.trim();
            const fileInfo = {
                filename,
                status: "Replicating...",
            };
            resolve(fileInfo);
        });
    },
});

const upload = multer({ storage });

const router = Router();
const fileController = new FileController();

router.post("/", upload.single("file"), (req, res, next) => {
    fileController
        .createNewFile(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.post("/:id/upload", (req, res, next) => {
    fileController
        .uploadFile(req, res, next)
        .then((response) => response)
        .catch(next);
});

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

router.get("/", async (req, res, next) => {
    fileController
        .findAllFiles(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.put("/:id", async (req, res, next) => {
    fileController
        .updateFile(req, res, next)
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
