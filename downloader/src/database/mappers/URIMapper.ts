import { URI, URIDTO, URIEntity } from "../model/URI";
import { AccountMapper } from "./AccountMapper";
import { FileMapper } from "./FileMapper";

export class URIMapper {
    toDBEntity(uri: URI): URIEntity {
        const uriEntity: URIEntity = new URIEntity();
        uriEntity.id = uri.id;
        uriEntity.onDriveId = uri.onDriveId;
        uriEntity.webContentLink = uri.webContentLink;
        uriEntity.file = uri.file;
        uriEntity.account = uri.account;
        return uriEntity;
    }

    toDTO(uri: URIEntity): URIDTO {
        const uriDTO: URIDTO = new URIDTO();
        uriDTO.id = uri.id;
        uriDTO.onDriveId = uri.onDriveId;
        if (uri.file) {
            uriDTO.file = new FileMapper().toDTO(uri.file);
        }
        if (uri.account) {
            uriDTO.account = new AccountMapper().toDTO(uri.account);
        }
        return uriDTO;
    }
}
