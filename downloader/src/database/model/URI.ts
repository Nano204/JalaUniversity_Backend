import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountDTO, AccountEntity } from "./Account";
import { FileDTO, FileEntity } from "./File";

export type URIRequest = {
    file: FileEntity;
    account: AccountEntity;
    onDriveId: string;
    webContentLink: string;
};

@Entity("URI")
@Index(["file", "account"], { unique: true })
export class URIEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column()
    public onDriveId?: string;

    @Column()
    public webContentLink?: string;

    @ManyToOne(() => FileEntity, (file) => file.uris, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    public file!: FileEntity;

    @ManyToOne(() => AccountEntity, (account) => account.uris, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    })
    public account!: AccountEntity;
}

export class URI {
    public id!: string;
    public file!: FileEntity;
    public account!: AccountEntity;
    public onDriveId?: string;
    public webContentLink?: string;
    constructor(requestInfo: URIRequest) {
        this.file = requestInfo.file;
        this.account = requestInfo.account;
        this.onDriveId = requestInfo.onDriveId;
        this.webContentLink = requestInfo.webContentLink;
    }
}

export class URIDTO {
    public id!: string;
    public onDriveId?: string;
    public webContentLink?: string;
    public file?: FileDTO;
    public account?: AccountDTO;
}
