import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AccountEntity } from "./Account";
import { FileEntity } from "./File";
import { URIEntity } from "./URI";

export type registryRequestInfo = {
    file: FileEntity;
    account: AccountEntity;
    uri: URIEntity;
};

@Entity()
export class DownloadInfoEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @ManyToOne(() => FileEntity, (file) => file.downloads)
    public file!: FileEntity;

    @ManyToOne(() => AccountEntity, (account) => account.downloads)
    public account!: AccountEntity;

    @ManyToOne(() => URIEntity, (account) => account.downloads)
    public uri!: URIEntity;

    @Column({ nullable: false })
    public date!: number;
}

export class DownloadInfo {
    public id!: string;
    public file!: FileEntity;
    public account!: AccountEntity;
    public uri!: URIEntity;
    public date!: number;
    constructor(requestInfo: registryRequestInfo) {
        this.file = requestInfo.file;
        this.account = requestInfo.account;
        this.uri = requestInfo.uri;
        this.date = new Date(new Date().toUTCString()).getTime();
    }
}

export class DownloadInfoDTO {
    public id!: string;
    public fileId!: string;
    public accountId!: string;
    public uriId!: string;
    public fileName!: string;
    public size!: number;
    public mimeType!: string;
    public onDriveId?: string;
    public webContentLink?: string;
    public date!: string;
}
