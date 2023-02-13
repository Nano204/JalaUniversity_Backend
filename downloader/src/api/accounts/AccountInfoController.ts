import { NextFunction, Request, Response } from "express";
import { AccountInfoMapper } from "../../database/mappers/AccountInfoMapper";
import { AccountState } from "../../database/model/AccountInfo";
import AccountInfoService from "../../services/AccountInfoService";
import { BadRequestException, NotFoundException } from "../errorHandler/Exceptions";

export default class AccountInfoController {
    private accountService: AccountInfoService;
    private mapToDTO: AccountInfoMapper["toDTO"];

    constructor() {
        this.accountService = new AccountInfoService();
        this.mapToDTO = new AccountInfoMapper().toDTO;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async createNewAccount(req: Request, res: Response, next: NextFunction) {
        const { accountOriginId, onDriveId, webContentLink } = req.body;
        const requestInfo = { accountOriginId, onDriveId, webContentLink };
        if (!accountOriginId || !onDriveId || !webContentLink) {
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
    async findAllAccount(req: Request, res: Response, next: NextFunction) {
        const accounts = await this.accountService.findAll();
        if (accounts.length) {
            const accountsDTO = accounts.map((account) => this.mapToDTO(account));
            return res.status(200).json(accountsDTO);
        }
        return res.status(200).json(accounts);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async findAccountsByState(req: Request, res: Response, next: NextFunction) {
        const { state } = req.query;
        const accounts = await this.accountService.findManyByState(state as AccountState);
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
