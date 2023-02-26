import { Account, FileInfo, FileUse, Registry } from "../types";

export default class FilesReportService {
    public createFilesReport(data: string) {
        const registries = JSON.parse(data) as Registry[];
        const filesReport: FileInfo[] = [];
        registries.forEach((registry) => {
            const date = new Date(registry.date);
            date.setHours(0, 0, 0, 0);
            registry.date = date.getTime();
            const fileReport = filesReport.find(
                (report) => report.fileId == registry.fileId
            );
            if (fileReport) {
                fileReport.totalDownloadSize += registry.size;
                fileReport.totalDownloadTimes += 1;
                const usage = fileReport.usage;
                const use = usage.find((use) => use.date == registry.date);
                if (use) {
                    this.updateUseInfo(use, registry);
                } else {
                    usage.push(this.createUseInfo(registry));
                }
            } else {
                filesReport.push(this.createFileInfo(registry));
            }
        });
        return filesReport;
    }

    private updateAccountInfo(account: Account): Account {
        account.timesUsed += 1;
        return account;
    }

    private createAccountInfo(registry: Registry): Account {
        const newAccount = {
            accountId: registry.accountId,
            accountStatus: registry.accountStatus,
            timesUsed: 1,
        };
        return newAccount;
    }

    private updateUseInfo(use: FileUse, registry: Registry): FileUse {
        use.dayDownloadUsages += 1;
        use.dayDownloadSize += registry.size;
        const accounts = use.accounts;
        const account = accounts.find(
            (account) => account.accountId == registry.accountId
        );
        if (account) {
            this.updateAccountInfo(account);
        } else {
            accounts.push(this.createAccountInfo(registry));
        }
        return use;
    }

    private createUseInfo(registry: Registry): FileUse {
        const newAccount = this.createAccountInfo(registry);
        const newUse = {
            date: registry.date,
            dayDownloadUsages: 1,
            dayDownloadSize: registry.size,
            accounts: [newAccount],
        };
        return newUse;
    }

    private createFileInfo(registry: Registry): FileInfo {
        const newUse = this.createUseInfo(registry);
        const newFileInfo = {
            fileId: registry.fileId,
            fileStatus: registry.fileStatus,
            mimeType: registry.mimeType,
            onDriveId: registry.onDriveId,
            webContentLink: registry.webContentLink,
            size: registry.size,
            totalDownloadSize: registry.size,
            totalDownloadTimes: 1,
            usage: [newUse],
        };
        return newFileInfo;
    }
}
