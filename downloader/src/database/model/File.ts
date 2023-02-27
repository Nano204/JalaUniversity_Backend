import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { URIDTO, URIEntity } from "./URI";

export type FileRequestInfo = {
    id: string;
    name: string;
    size: number;
    mimeType: string;
};

@Entity()
export class FileEntity {
    @PrimaryColumn({ nullable: false, unique: true })
    public id!: string;

    @Column({ nullable: false })
    public name!: string;

    @Column({ nullable: false })
    public size!: number;

    @Column({ nullable: false })
    public mimeType!: string;

    @Column({ nullable: false })
    public totalDownloadSize!: number;

    @Column({ nullable: false })
    public lastDownloadDate!: number;

    @Column({ nullable: false })
    public totalDownloadsCount!: number;

    @Column({ nullable: false })
    public todayTotalDownloadSize!: number;

    @Column({ nullable: false })
    public todayTotalDownloadsCount!: number;

    @OneToMany(() => URIEntity, (uri) => uri.file)
    public uris!: URIEntity[];
}

export class File {
    public id!: string;
    public name!: string;
    public size!: number;
    public mimeType!: string;
    public totalDownloadSize!: number;
    public totalDownloadsCount!: number;
    public lastDownloadDate!: number;
    public todayTotalDownloadSize!: number;
    public todayTotalDownloadsCount!: number;
    public uris!: URIEntity[];
    constructor(requestInfo: FileRequestInfo) {
        this.id = requestInfo.id;
        this.name = requestInfo.name;
        this.mimeType = requestInfo.mimeType;
        this.size = requestInfo.size;
        this.totalDownloadSize = 0;
        this.lastDownloadDate = 0;
        this.totalDownloadsCount = 0;
        this.todayTotalDownloadSize = 0;
        this.todayTotalDownloadsCount = 0;
    }
}

export class FileDTO {
    public id!: string;
    public name!: string;
    public size!: number;
    public mimeType!: string;
    public totalDownloadSize!: number;
    public totalDownloadsCount!: number;
    public todayTotalDownloadSize!: number;
    public todayTotalDownloadsCount!: number;
    public uris?: URIDTO[];
}
