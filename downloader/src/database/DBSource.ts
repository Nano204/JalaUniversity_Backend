import env from "../env";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    database: env.DATABASE_NAME,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD,
    synchronize: true,
    logging: false,
    entities: [],
    migrations: [],
    subscribers: [],
});
