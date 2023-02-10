import { Column, Entity, Index, ObjectID, ObjectIdColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export type FileRequestInfo = {
    name: string;
    size: number;
    mimeType: string;
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
    public _id!: ObjectID;

    @Column({ nullable: false })
    @Index({ unique: true })
    public id!: string;

    @Column({ nullable: false })
    public name!: string;

    @Column({ nullable: false })
    public size!: number;

    @Column({ nullable: false })
    public mimeType!: string;

    @Column({ nullable: false })
    public status!: string;

    @Column({ nullable: false })
    public onDriveFile!: OnDriveFile[];
}

export class File {
    public id!: string;
    public name!: string;
    public size!: number;
    public mimeType!: string;
    public status!: string;
    public onDriveFile!: OnDriveFile[];
    constructor(requestInfo: FileRequestInfo) {
        this.id = uuidv4();
        this.name = requestInfo.name;
        this.mimeType = requestInfo.mimeType;
        this.size = requestInfo.size;
        this.status = "Replicating...";
    }
}

export class FileDTO {
    public id!: string;
    public name!: string;
    public size!: number;
    public mimeType!: string;
    public status!: string;
    public onDriveFile!: OnDriveFile[];
}
