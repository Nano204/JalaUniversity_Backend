import { Router } from "express";
import URIRelationsController from "./URIRelationsController";

const router = Router();
const uriRelationsController = new URIRelationsController();

router.get("/:id", async (req, res, next) => {
    uriRelationsController
        .findURIAvailable(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.post("/", async (req, res, next) => {
    uriRelationsController
        .createNewURI(req, res, next)
        .then((response) => response)
        .catch(next);
});

export default router;
