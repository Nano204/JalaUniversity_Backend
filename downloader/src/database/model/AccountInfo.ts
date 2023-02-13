import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { File, FileEntity } from "./File";

export type AccountInfoRequest = {
    accountOriginId: string;
    onDriveId: string;
    webContentLink: string;
};

export type AccountState = "Available" | "Unavailable";

@Entity()
export class AccountInfoEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ nullable: false })
    public accountOriginId!: string;

    @Column({ nullable: false })
    public onDriveId!: string;

    @Column({ nullable: false })
    public webContentLink!: string;

    @Column({ nullable: false })
    public state!: AccountState;

    @ManyToOne(() => FileEntity, (file) => file.accounstInfo)
    public file!: FileEntity;
}

export class AccountInfo {
    public id!: string;
    public accountOriginId!: string;
    public onDriveId!: string;
    public webContentLink!: string;
    public state!: AccountState;
    public file!: File;
    constructor(requestInfo: AccountInfoRequest) {
        this.accountOriginId = requestInfo.accountOriginId;
        this.onDriveId = requestInfo.onDriveId;
        this.webContentLink = requestInfo.webContentLink;
        this.state = "Available";
    }
}

export class AccountInfoDTO {
    public id!: string;
    public webContentLink!: string;
    public state!: AccountState;
    public file!: File;
}