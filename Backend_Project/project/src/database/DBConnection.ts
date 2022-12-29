import { DataSource } from "typeorm";
import { Board } from "./board/Board";
import { Food } from "./food/Food";
import { Game } from "./game/Game";
import { IdSetter } from "./idBuilder/IdSetter";
import { Snake } from "./snake/Snake";
import { User } from "./user/User";

// export const AppDataSource = new DataSource({
//   type: "sqlite",
//   database: "database.sqlite",
//   synchronize: true,
//   logging: false,
//   entities: [User, Board, Snake, Food, Game],
//   migrations: [],
//   subscribers: [],
// });

export const AppDataSource = new DataSource({
  type: "mongodb",
  host: "127.0.0.1",
  port: 27017,
  database: "jalaBackend",
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // synchronize: true,
  entities: [User, Food, Snake, Board, Game, IdSetter],
});
