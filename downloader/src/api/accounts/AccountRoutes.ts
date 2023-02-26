import { Response, Router } from "express";
import AccountController from "./AccountController";

const router = Router();
const accountController = new AccountController();

router.get("/availables", async (req, res, next) => {
    accountController
        .findAvailableAccounts(req, res, next)
        .then((response: Response) => response)
        .catch(next);
});

router.get("/:id", async (req, res, next) => {
    accountController
        .findAccountById(req, res, next)
        .then((response: Response) => response)
        .catch(next);
});

router.get("/", async (req, res, next) => {
    accountController
        .findAllAccounts(req, res, next)
        .then((response: Response) => response)
        .catch(next);
});

router.post("/", async (req, res, next) => {
    accountController
        .createNewAccount(req, res, next)
        .then((response: Response) => response)
        .catch(next);
});

router.delete("/:id", async (req, res, next) => {
    accountController
        .deleteAccount(req, res, next)
        .then((response: Response) => response)
        .catch(next);
});

export default router;
