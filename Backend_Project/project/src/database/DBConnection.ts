import { DataSource } from "typeorm";
import { Board } from "./board/Board";
import { Food } from "./food/Food";
import { Game } from "./game/Game";
import { Snake } from "./snake/Snake";
import { User } from "./user/User";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  synchronize: true,
  logging: false,
  entities: [User, Board, Snake, Food, Game],
  migrations: [],
  subscribers: [],
});
