import { Router } from "express";
import AccountController from "./AccountController";

const router = Router();
const accountController = new AccountController();

router.post("/", async (req, res, next) => {
    await accountController.createNewAccount(req, res, next);
});

router.get("/:idOrEmail", async (req, res, next) => {
    await accountController.findAccountByIdOrEmail(req, res, next);
});

router.get("/", async (req, res, next) => {
    await accountController.findAllAccounts(req, res, next);
});

router.put("/:id", async (req, res, next) => {
    await accountController.updateAccount(req, res, next);
});

router.delete("/:id", async (req, res, next) => {
    await accountController.deleteAccount(req, res, next);
});

export default router;
