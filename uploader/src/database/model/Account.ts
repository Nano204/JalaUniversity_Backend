import { Column, Entity, Index, ObjectID, ObjectIdColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export type CreateAccountRequestInfo = { email: string; googleDriveKey: string };

@Entity()
export class AccountEntity {
    @ObjectIdColumn()
    public _id!: ObjectID;

    @Column({ nullable: false })
    @Index({ unique: true })
    public id!: string;

    @Column({ nullable: false })
    @Index({ unique: true })
    public email!: string;

    @Column({ nullable: false })
    @Index({ unique: true })
    public googleDriveKey!: string;
}

export class Account {
    public id!: string;
    public email!: string;
    public googleDriveKey!: string;
    constructor(requestInfo: CreateAccountRequestInfo) {
        this.id = uuidv4();
        this.email = requestInfo.email;
        this.googleDriveKey = requestInfo.googleDriveKey;
    }
}

export class AccountDTO {
    public id!: string;
    public email!: string;
}
