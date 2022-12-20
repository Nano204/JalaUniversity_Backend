import GameDomain from "../../domain/entities/GameDomain";
import { DBDeletion } from "../../domain/types/types";

export interface GameServiceInterface {
  saveGame(game: GameDomain): Promise<GameDomain>;
  findGame(id: number): Promise<GameDomain | null>;
  deleteGame(id: number): Promise<DBDeletion>;
  findAllGame(): Promise<GameDomain[]>;
}
