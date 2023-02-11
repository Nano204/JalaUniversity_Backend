import { ObjectId } from "mongodb";
import { Column, Entity, Index, ObjectID, ObjectIdColumn } from "typeorm";

export type FileRequestInfo = {
    fsId: string;
    name: string;
    size: number;
    chunkSize: number;
    mimeType: string;
    path?: string;
};

export type FileQueryInfo = {
    fsId?: string;
    name?: string;
    size?: number;
    chunkSize?: number;
    mimeType?: string;
    path?: string;
};

export type OnDriveFile = {
    accountId: string;
    onDriveId: string;
    webContentLink: string;
};

export type FileStatus = "Replicating..." | "Uploaded";

@Entity()
export class FileEntity {
    @ObjectIdColumn()
    public _id!: ObjectId;

    @Column({ nullable: false })
    @Index({ unique: true })
    public fsId!: ObjectId;

    @Column({ nullable: false })
    public name!: string;

    @Column({ nullable: false })
    public size!: number;

    @Column({ nullable: false })
    public chunkSize!: number;

    @Column({ nullable: false })
    public mimeType!: string;

    @Column({ nullable: false })
    public status!: string;

    @Column({ nullable: false })
    public onDriveFile!: OnDriveFile[];
}

export class File {
    public fsId!: ObjectId;
    public name!: string;
    public size!: number;
    public chunkSize!: number;
    public mimeType!: string;
    public status!: string;
    public onDriveFile!: OnDriveFile[];
    constructor(requestInfo: FileRequestInfo) {
        this.fsId = new ObjectId(requestInfo.fsId);
        this.name = requestInfo.name;
        this.mimeType = requestInfo.mimeType;
        this.size = requestInfo.size;
        this.chunkSize = requestInfo.chunkSize;
        this.status = "Replicating...";
    }
}

export class FileDTO {
    public fsId!: string;
    public name!: string;
    public size!: number;
    public mimeType!: string;
    public status!: string;
    public onDriveFile!: OnDriveFile[];
}
