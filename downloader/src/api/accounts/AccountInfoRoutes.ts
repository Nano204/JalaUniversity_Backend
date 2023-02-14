import { Router } from "express";
import AccountInfoController from "./AccountInfoController";

const router = Router();
const accountInfoController = new AccountInfoController();

router.get("/search", async (req, res, next) => {
    accountInfoController
        .findAvailableAccounts(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.get("/:id", async (req, res, next) => {
    accountInfoController
        .findAccountById(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.post("/", async (req, res, next) => {
    accountInfoController
        .createNewAccount(req, res, next)
        .then((response) => response)
        .catch(next);
});

export default router;
