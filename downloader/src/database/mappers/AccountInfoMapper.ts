import { AccountInfo, AccountInfoDTO, AccountInfoEntity } from "../model/AccountInfo";
import { FileMapper } from "./FileMapper";

export class AccountInfoMapper {
    toDBEntity(accountInfo: AccountInfo): AccountInfoEntity {
        const accountInfoEntity: AccountInfoEntity = new AccountInfoEntity();
        accountInfoEntity.id = accountInfo.id;
        accountInfoEntity.accountOriginId = accountInfo.accountOriginId;
        accountInfoEntity.lastDateDownloadSize = accountInfo.lastDateDownloadSize;
        accountInfoEntity.lastDownloadDate = accountInfo.lastDownloadDate;
        accountInfoEntity.files = accountInfo.files;
        return accountInfoEntity;
    }

    toDTO(accountInfo: AccountInfoEntity): AccountInfoDTO {
        const accountInfoDTO: AccountInfoDTO = new AccountInfoDTO();
        accountInfoDTO.id = accountInfo.id;
        accountInfoDTO.accountOriginId = accountInfo.accountOriginId;
        accountInfoDTO.lastDownload = {
            size: accountInfo.lastDateDownloadSize,
            date: new Date(accountInfo.lastDownloadDate),
        };
        if (accountInfo.files) {
            const fileMapper = new FileMapper();
            accountInfoDTO.files = accountInfo.files.map((files) =>
                fileMapper.toDTO(files)
            );
        }
        return accountInfoDTO;
    }
}
