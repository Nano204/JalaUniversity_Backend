import IGame from "../../domain/entities/IGame";
import { Game } from "../db_entities/Game";

export class gameMapper {
  static toDBEntity(game: IGame) {
    const entityGame: Game = new Game();
    entityGame.boardId = game.boardId;
    entityGame.foodId = game.foodId;
    entityGame.snakes = JSON.stringify(game.snakes);
    entityGame.users = JSON.stringify(game.users);
    return entityGame;
  }
  static toWorkUnit(game: Game) {
    const workGame: IGame = new IGame();
    workGame.id = game.id;
    workGame.boardId = game.boardId;
    workGame.foodId = game.foodId;
    workGame.snakes = JSON.parse(game.snakes);
    workGame.users = JSON.parse(game.users);
    return workGame;
  }
}
