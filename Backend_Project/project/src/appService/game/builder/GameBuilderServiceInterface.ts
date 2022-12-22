import GameDomain from "../../../domain/entities/GameDomain";
import { GameState } from "../../../domain/types/types";

export interface GameBuilderInterface {
  setState(gameId: number, state: GameState): Promise<GameDomain | void>;
  setSpeed(gameId: number, speed: number): Promise<GameDomain | void>;
  setSize(gameId: number, size: number): Promise<GameDomain | void>;
  setUsers(gameId: number, usersId: number[]): Promise<GameDomain | void>;
  buildGame(gameId: number): Promise<GameDomain | void>;
}
