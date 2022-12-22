import GameDomain from "../../domain/entities/GameDomain";
import { DBDeletion } from "../../domain/types/types";

export interface GameServiceInterface {
  createNew(): Promise<GameDomain>;
  updateGame(game: GameDomain): Promise<GameDomain>;
  findGame(id: number): Promise<GameDomain>;
  deleteGame(id: number): Promise<DBDeletion>;
  findAllGame(): Promise<GameDomain[]>;
}
