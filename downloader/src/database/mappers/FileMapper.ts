import { File, FileDTO, FileEntity } from "../model/File";
import { URIMapper } from "./URIMapper";

export class FileMapper {
    toDBEntity(file: File): FileEntity {
        const fileEntity: FileEntity = new FileEntity();
        fileEntity.id = file.id;
        fileEntity.name = file.name;
        fileEntity.size = file.size;
        fileEntity.mimeType = file.mimeType;
        fileEntity.uris = file.uris?.map((uri) => new URIMapper().toDBEntity(uri));
        return fileEntity;
    }

    toDTO(file: FileEntity): FileDTO {
        const fileDTO: FileDTO = new FileDTO();
        fileDTO.id = file.id;
        fileDTO.name = file.name;
        fileDTO.size = file.size;
        fileDTO.mimeType = file.mimeType;
        if (file.uris) {
            fileDTO.uris = file.uris.map((uri) => new URIMapper().toDTO(uri));
        }
        return fileDTO;
    }
}
