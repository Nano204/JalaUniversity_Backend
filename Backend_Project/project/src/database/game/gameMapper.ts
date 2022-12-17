import GameDomain from "../../domain/entities/GameDomain";
import { Game } from "./Game";
import { GameState } from "../../domain/types/types";

export class gameMapper {
  static toDBEntity(game: GameDomain) {
    const entityGame: Game = new Game();
    entityGame.state = game.state;
    entityGame.speed = game.speed;
    return entityGame;
  }
  static toWorkUnit(game: Game) {
    const workGame: GameDomain = new GameDomain();
    workGame.id = game.id;
    workGame.state = game.state as GameState;
    workGame.speed = game.speed;
    return workGame;
  }
}
