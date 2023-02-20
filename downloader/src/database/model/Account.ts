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
    public lastDownloadDate!: number;

    @Column({ nullable: false })
    public lastDateTotalDownloadSize!: number;

    @OneToMany(() => URIEntity, (uri) => uri.account)
    public uris!: URIEntity[];
}

export class Account {
    public id!: string;
    public lastDownloadDate!: number;
    public lastDateTotalDownloadSize!: number;
    public uris!: URIEntity[];
    constructor(requestInfo: AccountRequestInfo) {
        this.id = requestInfo.id;
        this.lastDownloadDate = 0;
        this.lastDateTotalDownloadSize = 0;
    }
}

export class AccountDTO {
    public id!: string;
    public uris?: URIDTO[];
    public lastUse?: {
        date: string;
        totalDownloadSize: number;
    };
}
