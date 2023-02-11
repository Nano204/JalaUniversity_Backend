import { ObjectId } from "mongodb";

export type CreateAccountRequestInfo = { email: string; googleDriveKey: string };

export class AccountEntity {
    public _id!: ObjectId;
    public email!: string;
    public googleDriveKey!: string;
}

export class Account {
    public _id!: ObjectId;
    public email!: string;
    public googleDriveKey!: string;
    constructor(requestInfo: CreateAccountRequestInfo) {
        this.email = requestInfo.email;
        this.googleDriveKey = requestInfo.googleDriveKey;
    }
}

export class AccountDTO {
    public _id!: string;
    public email!: string;
}
