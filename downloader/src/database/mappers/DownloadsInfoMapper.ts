import { DownloadInfo, DownloadInfoDTO, DownloadInfoEntity } from "../model/DownloadInfo";
import { AccountMapper } from "./AccountMapper";
import { FileMapper } from "./FileMapper";
import { URIMapper } from "./URIMapper";

export class DownloadInfoMapper {
    toDBEntity(downloadInfo: DownloadInfo): DownloadInfoEntity {
        const downloadInfoEntity: DownloadInfoEntity = new DownloadInfoEntity();
        downloadInfoEntity.id = downloadInfo.id;
        downloadInfoEntity.uri = new URIMapper().toDBEntity(downloadInfo.uri);
        downloadInfoEntity.file = new FileMapper().toDBEntity(downloadInfo.file);
        downloadInfoEntity.account = new AccountMapper().toDBEntity(downloadInfo.account);
        downloadInfoEntity.date = downloadInfo.date;
        return downloadInfoEntity;
    }

    toDTO(downloadInfo: DownloadInfoEntity): DownloadInfoDTO {
        const downloadInfoDTO: DownloadInfoDTO = new DownloadInfoDTO();
        downloadInfoDTO.id = downloadInfo.id;
        if (downloadInfo.file) {
            downloadInfoDTO.fileId = downloadInfo.file.id;
            downloadInfoDTO.fileName = downloadInfo.file.name;
            downloadInfoDTO.size = downloadInfo.file.size;
            downloadInfoDTO.mimeType = downloadInfo.file.mimeType;
        }
        if (downloadInfo.account) {
            downloadInfoDTO.accountId = downloadInfo.account.id;
        }
        if (downloadInfo.uri) {
            downloadInfoDTO.uriId = downloadInfo.uri.id;
            downloadInfoDTO.onDriveId = downloadInfo.uri.onDriveId;
            downloadInfoDTO.webContentLink = downloadInfo.uri.webContentLink;
        }
        downloadInfoDTO.date = new Date(downloadInfo.date).toString();
        return downloadInfoDTO;
    }
}
