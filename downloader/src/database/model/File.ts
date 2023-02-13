import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccountInfo, AccountInfoDTO, AccountInfoEntity } from "./AccountInfo";

export type FileRequestInfo = {
    name: string;
    size: number;
    mimeType: string;
};

@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ nullable: false })
    public name!: string;

    @Column({ nullable: false })
    public size!: number;

    @Column({ nullable: false })
    public mimeType!: string;

    @OneToMany(() => AccountInfoEntity, (accountInfo) => accountInfo.file)
    public accounstInfo!: AccountInfoEntity[];
}

export class File {
    public id!: string;
    public name!: string;
    public size!: number;
    public mimeType!: string;
    public accounstInfo!: AccountInfo[];
    constructor(requestInfo: FileRequestInfo) {
        this.name = requestInfo.name;
        this.mimeType = requestInfo.mimeType;
        this.size = requestInfo.size;
    }
}

export class FileDTO {
    public id!: string;
    public name!: string;
    public size!: number;
    public mimeType!: string;
    public accounstInfo!: AccountInfoDTO[];
}
