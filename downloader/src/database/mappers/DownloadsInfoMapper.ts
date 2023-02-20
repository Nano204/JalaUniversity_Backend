import { DownloadInfo, DownloadInfoDTO, DownloadInfoEntity } from "../model/DownloadInfo";
export class DownloadInfoMapper {
    toDBEntity(downloadInfo: DownloadInfo): DownloadInfoEntity {
        const downloadInfoEntity: DownloadInfoEntity = new DownloadInfoEntity();
        downloadInfoEntity.id = downloadInfo.id;
        downloadInfoEntity.fileId = downloadInfo.fileId;
        downloadInfoEntity.fileName = downloadInfo.fileName;
        downloadInfoEntity.size = downloadInfo.size;
        downloadInfoEntity.mimeType = downloadInfo.mimeType;
        downloadInfoEntity.accountId = downloadInfo.accountId;
        downloadInfoEntity.uriId = downloadInfo.uriId;
        downloadInfoEntity.onDriveId = downloadInfo.onDriveId;
        downloadInfoEntity.webContentLink = downloadInfo.webContentLink;
        downloadInfoEntity.date = downloadInfo.date;
        return downloadInfoEntity;
    }

    toDTO(downloadInfo: DownloadInfoEntity): DownloadInfoDTO {
        const downloadInfoDTO: DownloadInfoDTO = new DownloadInfoDTO();
        downloadInfoDTO.id = downloadInfo.id;
        downloadInfoDTO.fileId = downloadInfo.fileId;
        downloadInfoDTO.fileName = downloadInfo.fileName;
        downloadInfoDTO.size = downloadInfo.size;
        downloadInfoDTO.mimeType = downloadInfo.mimeType;
        downloadInfoDTO.accountId = downloadInfo.accountId;
        downloadInfoDTO.uriId = downloadInfo.uriId;
        downloadInfoDTO.onDriveId = downloadInfo.onDriveId;
        downloadInfoDTO.webContentLink = downloadInfo.webContentLink;
        downloadInfoDTO.date = new Date(downloadInfo.date).toString();
        return downloadInfoDTO;
    }
}
