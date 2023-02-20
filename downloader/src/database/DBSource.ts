import { DataSource } from "typeorm";
import { FileEntity } from "./model/File";
import { AccountEntity } from "./model/Account";
import env from "../env";
import { URIEntity } from "./model/URI";
import { DownloadInfoEntity } from "./model/DownloadInfo";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: env.DATABASE_NAME as string,
    synchronize: true,
    logging: false,
    migrations: [],
    subscribers: [],
    entities: [FileEntity, AccountEntity, URIEntity, DownloadInfoEntity],
});
