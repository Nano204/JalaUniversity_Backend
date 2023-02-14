import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { File, FileDTO, FileEntity } from "./File";

export type AccountInfoRequest = {
    accountOriginId: string;
};

@Entity()
export class AccountInfoEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ nullable: false, unique: true })
    public accountOriginId!: string;

    @Column({ nullable: false })
    public lastDateDownloadSize!: number;

    @Column({ nullable: false })
    public lastDownloadDate!: number;

    @ManyToMany(() => FileEntity, (file) => file.accountsInfo)
    @JoinTable({
        name: "URI",
        joinColumn: {
            name: "accountId",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "fileId",
            referencedColumnName: "id",
        },
    })
    public files!: FileEntity[];
}

export class AccountInfo {
    public id!: string;
    public accountOriginId!: string;
    public lastDateDownloadSize!: number;
    public lastDownloadDate!: number;
    public files!: File[];
    constructor(requestInfo: AccountInfoRequest) {
        this.accountOriginId = requestInfo.accountOriginId;
        this.lastDateDownloadSize = 0;
        const date = new Date(new Date().toUTCString());
        this.lastDownloadDate = date.getTime();
        this.files = [];
    }
}

export class AccountInfoDTO {
    public id!: string;
    public accountOriginId!: string;
    public lastDownload!: {
        size: number;
        date: Date;
    };
    public files!: FileDTO[];
}
