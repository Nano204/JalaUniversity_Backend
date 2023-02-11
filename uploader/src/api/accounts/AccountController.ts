import { NextFunction, Request, Response } from "express";
import { AccountMapper } from "../../database/mappers/AccountMapper";
import AccountService from "../../services/AccountService";
import { BadRequestException, NotFoundException } from "../errorHandler/Exceptions";

export default class AccountController {
    private accountService: AccountService;
    private mapToDTO: AccountMapper["toDTO"];

    constructor() {
        this.accountService = new AccountService();
        this.mapToDTO = new AccountMapper().toDTO;
    }

    async createNewAccount(req: Request, res: Response, next: NextFunction) {
        const { email, googleDriveKey } = req.body;
        const requestInfo = { email, googleDriveKey };
        if (!email || !googleDriveKey) {
            return next(new BadRequestException("One or more parameters ara missing"));
        }
        const newAccount = await this.accountService.createNew(requestInfo);
        return res.status(201).json(this.mapToDTO(newAccount));
    }

    async findAccountByIdOrEmail(req: Request, res: Response, next: NextFunction) {
        const { idOrEmail } = req.params;
        const account =
            (await this.accountService.findById(idOrEmail)) ||
            (await this.accountService.findByEmail(idOrEmail));
        if (!account) {
            return next(new NotFoundException());
        }
        return res.status(200).json(this.mapToDTO(account));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findAllAccounts(req: Request, res: Response, next: NextFunction) {
        const accounts = await this.accountService.findAll();
        if (accounts.length) {
            const accountsDTO = accounts.map((account) => this.mapToDTO(account));
            return res.status(200).json(accountsDTO);
        }
        return res.status(200).json(accounts);
    }

    async updateAccount(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const account = await this.accountService.findById(id);
        if (!account) {
            return next(new NotFoundException());
        }
        const updateAccount = await this.accountService.update({
            ...account,
            ...req.body,
        });
        return res.status(200).json(updateAccount);
    }

    async deleteAccount(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const deleted = await this.accountService.deleteById(id);
        if (!deleted.deletedCount) {
            return next(new NotFoundException());
        }
        return res.status(200).json(deleted);
    }
}
