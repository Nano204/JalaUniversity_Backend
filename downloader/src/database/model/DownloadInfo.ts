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

export type Status = "Available" | "Deleted";

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

    @Column({ nullable: false })
    public fileStatus!: Status;

    @Column({ nullable: false })
    public accountStatus!: Status;
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
    public fileStatus!: Status;
    public accountStatus!: Status;
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
        this.onDriveId = requestInfo.onDriveId;
        this.webContentLink = requestInfo.webContentLink;
        this.fileStatus = "Available";
        this.accountStatus = "Available";
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
    public fileStatus!: Status;
    public accountStatus!: Status;
}
