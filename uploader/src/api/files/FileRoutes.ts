import { Router } from "express";
import FileController from "./FileController";
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "./src/api/files/uploads/");
    },
});
const upload = multer({ storage });

const router = Router();
const accountController = new FileController();

router.post("/", upload.single("file"), async (req, res, next) => {
    await accountController.createNewFile(req, res, next);
});

router.get("/search", async (req, res, next) => {
    await accountController.findFilesByQuery(req, res, next);
});

router.get("/:id", async (req, res, next) => {
    await accountController.findFileById(req, res, next);
});

router.get("/", async (req, res, next) => {
    await accountController.findAllFiles(req, res, next);
});

router.put("/:id", async (req, res, next) => {
    await accountController.updateFile(req, res, next);
});

router.delete("/:id", async (req, res, next) => {
    await accountController.deleteFile(req, res, next);
});

export default router;
