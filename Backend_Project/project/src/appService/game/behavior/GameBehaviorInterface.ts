import GameDomain from "../../../domain/entities/GameDomain";

export interface GameBehaviorServiceInterface {
  visualizeBoard(gameId: number): Promise<string>;
  initialize(): Promise<GameDomain>;
  reset(): Promise<GameDomain>;
  stop(): Promise<GameDomain>;
}
