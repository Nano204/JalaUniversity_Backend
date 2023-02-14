import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccountInfo, AccountInfoDTO, AccountInfoEntity } from "./AccountInfo";

export type FileRequestInfo = {
    fileOriginId: string;
    name: string;
    size: number;
    mimeType: string;
};

@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ nullable: false, unique: true })
    public fileOriginId!: string;

    @Column({ nullable: false })
    public name!: string;

    @Column({ nullable: false })
    public size!: number;

    @Column({ nullable: false })
    public mimeType!: string;

    @ManyToMany(() => AccountInfoEntity, (accountInfo) => accountInfo.files)
    public accountsInfo!: AccountInfoEntity[];
}

export class File {
    public id!: string;
    public fileOriginId!: string;
    public name!: string;
    public size!: number;
    public mimeType!: string;
    public accountsInfo!: AccountInfo[];
    constructor(requestInfo: FileRequestInfo) {
        this.fileOriginId = requestInfo.fileOriginId;
        this.name = requestInfo.name;
        this.mimeType = requestInfo.mimeType;
        this.size = requestInfo.size;
        this.accountsInfo = [];
    }
}

export class FileDTO {
    public id!: string;
    public fileOriginId!: string;
    public name!: string;
    public size!: number;
    public mimeType!: string;
    public accountsInfo!: AccountInfoDTO[];
}
