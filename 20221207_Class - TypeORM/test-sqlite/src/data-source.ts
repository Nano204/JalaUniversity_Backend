import "reflect-metadata";
import { DataSource } from "typeorm";
import { Photo } from "./entities/photo";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Photo],
  migrations: [],
  subscribers: [],
});
