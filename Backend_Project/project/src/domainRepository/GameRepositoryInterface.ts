import GameDomain from "../domain/entities/GameDomain";
import { DBDeletion } from "../domain/types/types";

export interface GameRepositoryInterface {
  build(game: GameDomain, usersIdArray: number[], size: number): Promise<GameDomain>;
  find(id: number): Promise<GameDomain | null>;
  delete(id: number): Promise<DBDeletion>;
  getAll(): Promise<GameDomain[]>;
}
