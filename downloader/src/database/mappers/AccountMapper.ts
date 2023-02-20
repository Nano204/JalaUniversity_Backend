import { Account, AccountDTO, AccountEntity } from "../model/Account";
import { URIMapper } from "./URIMapper";

export class AccountMapper {
    toDBEntity(account: Account): AccountEntity {
        const accountEntity: AccountEntity = new AccountEntity();
        accountEntity.id = account.id;
        accountEntity.lastDownloadDate = account.lastDownloadDate;
        accountEntity.lastDateTotalDownloadSize = account.lastDateTotalDownloadSize;
        accountEntity.uris = account.uris?.map((uri) => new URIMapper().toDBEntity(uri));
        return accountEntity;
    }

    toDTO(account: AccountEntity): AccountDTO {
        const accountDTO: AccountDTO = new AccountDTO();
        accountDTO.id = account.id;
        if (account.uris) {
            accountDTO.uris = account.uris?.map((uri) => new URIMapper().toDTO(uri));
        }
        accountDTO.lastUse = {
            date: account.lastDownloadDate
                ? new Date(account.lastDownloadDate).toString()
                : "unused",
            totalDownloadSize: account.lastDateTotalDownloadSize,
        };
        return accountDTO;
    }
}
