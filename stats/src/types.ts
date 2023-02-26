export type Registry = {
    id: string;
    fileId: string;
    accountId: string;
    uriId: string;
    fileName: string;
    size: number;
    mimeType: string;
    onDriveId?: string;
    webContentLink?: string;
    date: number;
    fileStatus: string;
    accountStatus: string;
};

export type AccountInfo = {
    accountId: string;
    accountStatus: string;
    totalDownloadSize: number;
    downloadUsages: number;
    usage: AccountUse[];
};

export type File = {
    fileId: string;
    fileName: string;
    fileStatus: string;
    mimeType: string;
    onDriveId?: string;
    webContentLink?: string;
    size: number;
    timesDownloaded: number;
};

export type AccountUse = {
    date: number;
    dayDownloadUsages: number;
    dayDownloadSize: number;
    files: File[];
};

export type FileInfo = {
    fileId: string;
    fileStatus: string;
    mimeType: string;
    onDriveId?: string;
    webContentLink?: string;
    size: number;
    totalDownloadSize: number;
    totalDownloadTimes: number;
    usage: FileUse[];
};

export type Account = {
    accountId: string;
    accountStatus: string;
    timesUsed: number;
};

export type FileUse = {
    date: number;
    dayDownloadUsages: number;
    dayDownloadSize: number;
    accounts: Account[];
};
