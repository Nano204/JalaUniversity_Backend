import { AccountInfo, File, Registry, AccountUse } from "../types";

export default class AccountsReportService {
    createAccountsReport(data: string) {
        const registries = JSON.parse(data) as Registry[];
        const accountsReport: AccountInfo[] = [];
        registries.forEach((registry) => {
            const date = new Date(registry.date);
            date.setHours(0, 0, 0, 0);
            registry.date = date.getTime();
            const accountReport = accountsReport.find(
                (report) => report.accountId == registry.accountId
            );
            if (accountReport) {
                accountReport.totalDownloadSize += registry.size;
                accountReport.downloadUsages += 1;
                const usage = accountReport.usage;
                const use = usage.find((use) => use.date == registry.date);
                if (use) {
                    this.updateUseInfo(use, registry);
                } else {
                    usage.push(this.createUseInfo(registry));
                }
            } else {
                accountsReport.push(this.createAccountInfo(registry));
            }
        });
        return accountsReport;
    }

    private updateFileInfo(file: File): File {
        file.timesDownloaded += 1;
        return file;
    }

    private createFileInfo(registry: Registry): File {
        const newFile = {
            fileId: registry.fileId,
            fileName: registry.fileName,
            fileStatus: registry.fileStatus,
            mimeType: registry.mimeType,
            onDriveId: registry.onDriveId,
            webContentLink: registry.webContentLink,
            size: registry.size,
            timesDownloaded: 1,
        };
        return newFile;
    }

    private updateUseInfo(use: AccountUse, registry: Registry): AccountUse {
        use.dayDownloadUsages += 1;
        use.dayDownloadSize += registry.size;
        const files = use.files;
        const file = files.find((file) => file.fileId == registry.fileId);
        if (file) {
            this.updateFileInfo(file);
        } else {
            files.push(this.createFileInfo(registry));
        }
        return use;
    }

    private createUseInfo(registry: Registry): AccountUse {
        const newFile = this.createFileInfo(registry);
        const newUse = {
            date: registry.date,
            dayDownloadUsages: 1,
            dayDownloadSize: registry.size,
            files: [newFile],
        };
        return newUse;
    }

    private createAccountInfo(registry: Registry): AccountInfo {
        const newUse = this.createUseInfo(registry);
        const newAccountInfo = {
            accountId: registry.accountId,
            accountStatus: registry.accountStatus,
            totalDownloadSize: registry.size,
            downloadUsages: 1,
            usage: [newUse],
        };
        return newAccountInfo;
    }
}
