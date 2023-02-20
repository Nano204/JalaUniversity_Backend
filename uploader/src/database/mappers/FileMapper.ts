import { ObjectId } from "mongodb";
import { File, FileDTO, FileEntity, FileStatus } from "../model/File";

export class FileMapper {
    toDBEntity(file: File): FileEntity {
        const fileEntity: FileEntity = new FileEntity();
        fileEntity.tempDBReference = new ObjectId(file.tempDBReference);
        fileEntity.name = file.name;
        fileEntity.size = file.size;
        fileEntity.mimeType = file.mimeType;
        fileEntity.status = file.status;
        fileEntity.onDriveFile = file.onDriveFile;
        return fileEntity;
    }

    toDTO(file: FileEntity): FileDTO {
        const fileDTO: FileDTO = new FileDTO();
        fileDTO._id = file._id.toString();
        fileDTO.name = file.name;
        fileDTO.size = file.size;
        fileDTO.status = file.status as FileStatus;
        fileDTO.mimeType = file.mimeType;
        fileDTO.tempDBReference = file.tempDBReference.toString();
        fileDTO.onDriveFile = file.onDriveFile;
        return fileDTO;
    }
}
