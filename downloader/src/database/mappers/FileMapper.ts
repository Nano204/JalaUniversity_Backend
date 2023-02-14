import { File, FileDTO, FileEntity } from "../model/File";
import { AccountInfoMapper } from "./AccountInfoMapper";

export class FileMapper {
    toDBEntity(file: File): FileEntity {
        const fileEntity: FileEntity = new FileEntity();
        fileEntity.id = file.id;
        fileEntity.fileOriginId = file.fileOriginId;
        fileEntity.name = file.name;
        fileEntity.size = file.size;
        fileEntity.mimeType = file.mimeType;
        fileEntity.accountsInfo = file.accountsInfo;
        return fileEntity;
    }

    toDTO(file: FileEntity): FileDTO {
        const fileDTO: FileDTO = new FileDTO();
        fileDTO.id = file.id;
        fileDTO.fileOriginId = file.fileOriginId;
        fileDTO.name = file.name;
        fileDTO.size = file.size;
        fileDTO.mimeType = file.mimeType;
        if (file.accountsInfo) {
            const accounstInfoMapper = new AccountInfoMapper();
            fileDTO.accountsInfo = file.accountsInfo.map((accountInfo) =>
                accounstInfoMapper.toDTO(accountInfo)
            );
        }
        return fileDTO;
    }
}
