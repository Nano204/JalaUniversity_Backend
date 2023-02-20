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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createNewAccount(req: Request, res: Response, next: NextFunction) {
        const { accountId, onDriveId, webContentLink } = req.body;
        const requestInfo = { id: accountId, onDriveId, webContentLink };
        if (!accountId || !onDriveId || !webContentLink) {
            throw new BadRequestException("One or more parameters are missing");
        }
        const newAccount = await this.accountService.createNew(requestInfo);
        return res.status(201).json(this.mapToDTO(newAccount));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findAccountById(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const account = await this.accountService.findById(id);
        if (!account) {
            throw new NotFoundException();
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findAvailableAccounts(req: Request, res: Response, next: NextFunction) {
        const accounts = await this.accountService.findAvailables();
        if (!accounts.length) {
            throw new NotFoundException();
        }
        const accountsDTO = accounts.map((account) => this.mapToDTO(account));
        return res.status(200).json(accountsDTO);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async updateAccount(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const account = await this.accountService.findById(id);
        if (!account) {
            throw new NotFoundException();
        }
        const updatedAccount = await this.accountService.update({
            ...account,
            ...req.body,
        });
        return res.status(200).json(this.mapToDTO(updatedAccount));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async deleteAccount(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        const deleted = await this.accountService.deleteById(id);
        if (!deleted.affected) {
            throw new NotFoundException();
        }
        return res.status(200).json(deleted);
    }
}
