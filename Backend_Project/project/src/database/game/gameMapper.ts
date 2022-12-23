import GameDomain from "../../domain/entities/GameDomain";
import { Game } from "./Game";
import { GameState } from "../../domain/types/types";
import { boardMapper } from "../board/boardMapper";
import { snakeMapper } from "../snake/snakeMapper";
import { userMapper } from "../user/userMapper";
import { foodMapper } from "../food/foodMapper";

export class gameMapper {
  static toDBEntity(game: GameDomain) {
    const entityGame: Game = new Game();
    if (game.id) {
      entityGame.id = game.id;
    }
    entityGame.state = game.state;
    entityGame.interval = game.interval;
    entityGame.size = game.size;
    if (game.users) {
      entityGame.users = game.users.map((user) => userMapper.toDBEntity(user));
    }
    if (game.board) {
      entityGame.board = boardMapper.toDBEntity(game.board);
    }
    if (game.snakes) {
      entityGame.snakes = game.snakes.map((snake) => snakeMapper.toDBEntity(snake));
    }
    if (game.users) {
      entityGame.users = game.users.map((user) => userMapper.toDBEntity(user));
    }
    if (game.food) {
      entityGame.food = foodMapper.toDBEntity(game.food);
    }
    return entityGame;
  }

  static toWorkUnit(game: Game) {
    const workGame: GameDomain = new GameDomain();
    if (game.id) {
      workGame.id = game.id;
    }
    workGame.state = game.state as GameState;
    workGame.interval = game.interval;
    workGame.size = game.size;
    if (game.users) {
      workGame.users = game.users.map((user) => userMapper.toWorkUnit(user));
    }
    if (game.board) {
      workGame.board = boardMapper.toWorkUnit(game.board);
    }
    if (game.snakes) {
      workGame.snakes = game.snakes.map((snake) => snakeMapper.toWorkUnit(snake));
    }
    if (game.food) {
      workGame.food = foodMapper.toWorkUnit(game.food);
    }
    return workGame;
  }
}
