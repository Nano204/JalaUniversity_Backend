import { DataSource } from "typeorm";
import env from "../env";

export const AppDataSource = new DataSource({
    type: "mongodb",
    host: "127.0.0.1",
    port: 27017,
    database: env.DATABASE_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    synchronize: true,
});
