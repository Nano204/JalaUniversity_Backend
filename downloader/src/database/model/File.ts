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

    @OneToMany(() => URIEntity, (uri) => uri.file)
    public uris!: URIEntity[];
}

export class File {
    public id!: string;
    public name!: string;
    public size!: number;
    public mimeType!: string;
    public uris!: URIEntity[];
    constructor(requestInfo: FileRequestInfo) {
        this.id = requestInfo.id;
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
    public uris?: URIDTO[];
}
