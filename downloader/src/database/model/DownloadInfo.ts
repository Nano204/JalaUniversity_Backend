import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type RegistryRequestInfo = {
    fileId: string;
    accountId: string;
    uriId: string;
    fileName: string;
    size: number;
    mimeType: string;
    onDriveId?: string;
    webContentLink?: string;
};

@Entity()
export class DownloadInfoEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ nullable: false })
    public fileId!: string;

    @Column({ nullable: false })
    public accountId!: string;

    @Column({ nullable: false })
    public uriId!: string;

    @Column({ nullable: false })
    public fileName!: string;

    @Column({ nullable: false })
    public size!: number;

    @Column({ nullable: false })
    public mimeType!: string;

    @Column({ nullable: false })
    public onDriveId?: string;

    @Column({ nullable: false })
    public webContentLink?: string;

    @Column({ nullable: false })
    public date!: number;
}

export class DownloadInfo {
    public id!: string;
    public fileId!: string;
    public accountId!: string;
    public uriId!: string;
    public fileName!: string;
    public size!: number;
    public mimeType!: string;
    public onDriveId?: string;
    public webContentLink?: string;
    public date!: number;
    constructor(requestInfo: RegistryRequestInfo) {
        this.fileId = requestInfo.fileId;
        this.fileName = requestInfo.fileName;
        this.size = requestInfo.size;
        this.mimeType = requestInfo.mimeType;
        this.accountId = requestInfo.accountId;
        this.uriId = requestInfo.uriId;
        this.onDriveId = requestInfo.onDriveId;
        this.webContentLink = requestInfo.webContentLink;
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
