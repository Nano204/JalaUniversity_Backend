import { DataSource } from "typeorm";
import { Board } from "./db_entities/Board";
import { Food } from "./db_entities/Food";
import { Game } from "./db_entities/Game";
import { Snake } from "./db_entities/Snake";
import { User } from "./db_entities/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Board, Snake, Food, Game],
  migrations: [],
  subscribers: [],
});
