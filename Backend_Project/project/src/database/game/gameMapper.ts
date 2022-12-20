import GameDomain from "../../domain/entities/GameDomain";
import { Game } from "./Game";
import { GameState } from "../../domain/types/types";

export class gameMapper {
  static toDBEntity(game: GameDomain) {
    const entityGame: Game = new Game();
    entityGame.state = game.state;
    entityGame.speed = game.speed;
    entityGame.size = game.size;
    entityGame.users = JSON.stringify(game.users);
    entityGame.board = JSON.stringify(game.board);
    entityGame.snakes = JSON.stringify(game.snakes);
    entityGame.food = JSON.stringify(game.food);
    return entityGame;
  }
  static toWorkUnit(game: Game) {
    const workGame: GameDomain = new GameDomain();
    workGame.id = game.id;
    workGame.state = game.state as GameState;
    workGame.speed = game.speed;
    workGame.size = game.size;
    workGame.users = JSON.parse(game.users);
    workGame.board = JSON.parse(game.board);
    workGame.snakes = game.snakes && JSON.parse(game.snakes);
    workGame.food = game.food && JSON.parse(game.food);
    return workGame;
  }
}
