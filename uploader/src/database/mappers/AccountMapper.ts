import { Account, AccountDTO, AccountEntity } from "../model/Account";

export class AccountMapper {
    toDBEntity(account: Account): AccountEntity {
        const accountEntity: AccountEntity = new AccountEntity();
        accountEntity.id = account.id;
        accountEntity.email = account.email;
        accountEntity.googleDriveKey = account.googleDriveKey;
        return accountEntity;
    }

    toDTO(account: AccountEntity): AccountDTO {
        const accountDTO: AccountDTO = new AccountDTO();
        accountDTO.id = account.id;
        accountDTO.email = account.email;
        return accountDTO;
    }
}
