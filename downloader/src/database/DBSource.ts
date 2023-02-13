import { DataSource } from "typeorm";
import { FileEntity } from "./model/File";
import { AccountInfoEntity } from "./model/AccountInfo";
import env from "../env";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: env.DATABASE_NAME as string,
    synchronize: true,
    logging: false,
    migrations: [],
    subscribers: [],
    entities: [FileEntity, AccountInfoEntity],
});
