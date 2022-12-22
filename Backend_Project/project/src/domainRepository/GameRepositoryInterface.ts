import GameDomain from "../domain/entities/GameDomain";
import { DBDeletion } from "../domain/types/types";

export interface GameRepositoryInterface {
  save(game: GameDomain): Promise<GameDomain>;
  findById(id: number): Promise<GameDomain>;
  deleteById(id: number): Promise<DBDeletion>;
  findAll(): Promise<GameDomain[]>;
}
