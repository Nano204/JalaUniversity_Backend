import { ObjectId } from "mongodb";

export type UploadFileRequestInfo = {
    fileId: string;
    tempDBReference: string;
    name: string;
    size: number;
    mimeType: string;
};

export type FileRequestInfo = {
    tempDBReference: string;
    name: string;
    size: number;
    mimeType: string;
};

export type FileQueryInfo = {
    tempDBReference?: string;
    name?: string;
    size?: number;
    chunkSize?: number;
    mimeType?: string;
};

export type OnDriveFile = {
    accountId: string;
    onDriveId: string;
    webContentLink: string;
};

export type FileStatus = "Stored on DB" | "Replicating..." | "Uploaded";

export class FileEntity {
    public _id!: ObjectId;
    public tempDBReference!: ObjectId;
    public name!: string;
    public size!: number;
    public mimeType!: string;
    public status!: string;
    public onDriveFile!: OnDriveFile[];
}

export class File {
    public _id!: ObjectId;
    public tempDBReference!: ObjectId;
    public name!: string;
    public size!: number;
    public mimeType!: string;
    public status!: FileStatus;
    public onDriveFile!: OnDriveFile[];
    constructor(requestInfo: FileRequestInfo) {
        this.tempDBReference = new ObjectId(requestInfo.tempDBReference);
        this.name = requestInfo.name;
        this.mimeType = requestInfo.mimeType;
        this.size = requestInfo.size;
        this.status = "Replicating...";
        this.onDriveFile = [];
    }
}

export class FileDTO {
    public _id!: string;
    public tempDBReference!: string;
    public name!: string;
    public size!: number;
    public mimeType!: string;
    public status!: FileStatus;
    public onDriveFile!: OnDriveFile[];
}
