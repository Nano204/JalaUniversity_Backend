import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { URIDTO, URIEntity } from "./URI";

export type AccountRequestInfo = {
    id: string;
};

@Entity()
export class AccountEntity {
    @PrimaryColumn({ nullable: false, unique: true })
    public id!: string;

    @Column({ nullable: false })
    public totalDownloadSize!: number;

    @Column({ nullable: false })
    public totalDownloadsCount!: number;

    @Column({ nullable: false })
    public lastDownloadDate!: number;

    @Column({ nullable: false })
    public lastDateTotalDownloadSize!: number;

    @Column({ nullable: false })
    public lastDateTotalDownloadsCount!: number;

    @OneToMany(() => URIEntity, (uri) => uri.account)
    public uris!: URIEntity[];
}

export class Account {
    public id!: string;
    public totalDownloadSize!: number;
    public totalDownloadsCount!: number;
    public lastDownloadDate!: number;
    public lastDateTotalDownloadSize!: number;
    public lastDateTotalDownloadsCount!: number;
    public uris!: URIEntity[];
    constructor(requestInfo: AccountRequestInfo) {
        this.id = requestInfo.id;
        this.totalDownloadSize = 0;
        this.lastDownloadDate = 0;
        this.lastDateTotalDownloadSize = 0;
        this.totalDownloadsCount = 0;
        this.lastDateTotalDownloadsCount = 0;
    }
}

export class AccountDTO {
    public id!: string;
    public uris?: URIDTO[];
    public totalDownloadsCount!: number;
    public totalDownloadSize!: number;
    public lastUse?: {
        date: string;
        downloadSize: number;
        downloadsCount: number;
    };
}
