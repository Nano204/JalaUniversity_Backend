import { Router } from "express";
import AccountController from "./AccountController";

const router = Router();
const accountController = new AccountController();

router.post("/", (req, res, next) => {
    accountController
        .createNewAccount(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.get("/:idOrEmail", (req, res, next) => {
    accountController
        .findAccountByIdOrEmail(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.get("/", (req, res, next) => {
    accountController
        .findAllAccounts(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.put("/:id", (req, res, next) => {
    accountController
        .updateAccount(req, res, next)
        .then((response) => response)
        .catch(next);
});

router.delete("/:id", (req, res, next) => {
    accountController
        .deleteAccount(req, res, next)
        .then((response) => response)
        .catch(next);
});

export default router;
