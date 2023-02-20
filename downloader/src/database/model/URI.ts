import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AccountDTO, AccountEntity } from "./Account";
import { DownloadInfoEntity } from "./DownloadInfo";
import { FileDTO, FileEntity } from "./File";

export type URIRequest = {
    file: FileEntity;
    account: AccountEntity;
    onDriveId: string;
    webContentLink: string;
};

@Entity("URI")
export class URIEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column()
    public onDriveId?: string;

    @Column()
    public webContentLink?: string;

    @ManyToOne(() => FileEntity, (file) => file.uris)
    public file!: FileEntity;

    @ManyToOne(() => AccountEntity, (account) => account.uris)
    public account!: AccountEntity;

    @OneToMany(() => DownloadInfoEntity, (downloadInfo) => downloadInfo.uri)
    public downloads?: DownloadInfoEntity[];
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
