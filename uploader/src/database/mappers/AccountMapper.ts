import { Account, AccountDTO, AccountEntity } from "../model/Account";

export class AccountMapper {
    toDBEntity(account: Account): AccountEntity {
        const accountEntity: AccountEntity = new AccountEntity();
        accountEntity.email = account.email;
        accountEntity.googleDriveKey = account.googleDriveKey;
        return accountEntity;
    }

    toDTO(account: AccountEntity): AccountDTO {
        const accountDTO: AccountDTO = new AccountDTO();
        accountDTO._id = account._id.toString();
        accountDTO.email = account.email;
        return accountDTO;
    }
}
