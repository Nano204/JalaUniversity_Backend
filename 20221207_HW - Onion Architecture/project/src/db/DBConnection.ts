import "reflect-metadata";
import { DataSource } from "typeorm";
import { Location } from "../domain/location";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [Location],
  migrations: [],
  subscribers: [],
});
