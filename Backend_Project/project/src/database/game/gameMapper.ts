import GameDomain from "../../domain/entities/GameDomain";
import { Game } from "./Game";
import { GameState } from "../../domain/types/types";
import { boardMapper } from "../board/boardMapper";
import { snakeMapper } from "../snake/snakeMapper";
import { userMapper } from "../user/userMapper";

export class gameMapper {
  static toDBEntity(game: GameDomain) {
    const entityGame: Game = new Game();
    if (game.id) {
      entityGame.id = game.id;
    }
    entityGame.state = game.state;
    entityGame.speed = game.speed;
    entityGame.size = game.size;
    if (game.board) {
      entityGame.board = boardMapper.toDBEntity(game.board);
    }
    if (game.snakes) {
      entityGame.snakes = game.snakes.map((snake) => snakeMapper.toDBEntity(snake));
    }
    if (game.users) {
      entityGame.users = game.users.map((user) => userMapper.toDBEntity(user));
    }
    entityGame.food = JSON.stringify(game.food);
    return entityGame;
  }
  static toWorkUnit(game: Game) {
    const workGame: GameDomain = new GameDomain();
    workGame.id = game.id;
    workGame.state = game.state as GameState;
    workGame.speed = game.speed;
    workGame.size = game.size;
    if (game.board) {
      workGame.board = boardMapper.toWorkUnit(game.board);
    }
    if (game.snakes) {
      workGame.snakes = game.snakes.map((snake) => snakeMapper.toWorkUnit(snake));
    }
    workGame.food = game.food && JSON.parse(game.food);
    return workGame;
  }
}
