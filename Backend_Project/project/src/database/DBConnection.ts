import { DataSource } from "typeorm";
import { Board } from "./db_entities/Board";
import { Snake } from "./db_entities/Snake";
import { User } from "./db_entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Board, Snake],
  migrations: [],
  subscribers: [],
});
