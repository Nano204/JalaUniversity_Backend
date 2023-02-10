import { File, FileDTO, FileEntity } from "../model/File";

export class FileMapper {
    toDBEntity(file: File): FileEntity {
        const fileEntity: FileEntity = new FileEntity();
        fileEntity.id = file.id;
        fileEntity.name = file.name;
        fileEntity.size = file.size;
        fileEntity.mimeType = file.mimeType;
        fileEntity.status = file.status;
        fileEntity.onDriveFile = file.onDriveFile;
        return fileEntity;
    }

    toDTO(file: FileEntity): FileDTO {
        const fileDTO: FileDTO = new FileDTO();
        fileDTO.id = file.id;
        fileDTO.name = file.name;
        fileDTO.size = file.size;
        fileDTO.status = file.status;
        fileDTO.mimeType = file.mimeType;
        fileDTO.onDriveFile = file.onDriveFile;
        return fileDTO;
    }
}
