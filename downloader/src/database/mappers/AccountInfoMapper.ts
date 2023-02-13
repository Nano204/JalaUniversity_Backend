import { AccountInfo, AccountInfoDTO, AccountInfoEntity } from "../model/AccountInfo";

export class AccountInfoMapper {
    toDBEntity(accountInfo: AccountInfo): AccountInfoEntity {
        const accountInfoEntity: AccountInfoEntity = new AccountInfoEntity();
        accountInfoEntity.id = accountInfo.id;
        accountInfoEntity.accountOriginId = accountInfo.accountOriginId;
        accountInfoEntity.onDriveId = accountInfo.onDriveId;
        accountInfoEntity.state = accountInfo.state;
        accountInfoEntity.webContentLink = accountInfo.webContentLink;
        accountInfoEntity.file = accountInfo.file;
        return accountInfoEntity;
    }

    toDTO(accountInfo: AccountInfoEntity): AccountInfoDTO {
        const accountInfoDTO: AccountInfoDTO = new AccountInfoDTO();
        accountInfoDTO.id = accountInfo.id;
        accountInfoDTO.state = accountInfo.state;
        accountInfoDTO.webContentLink = accountInfo.webContentLink;
        accountInfoDTO.file = accountInfo.file;
        return accountInfoDTO;
    }
}
