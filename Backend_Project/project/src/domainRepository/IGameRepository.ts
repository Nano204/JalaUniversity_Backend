import IGame from "../domain/entities/IGame";
import { DBDeletion } from "../domain/types/types";

export interface IGameRepository {
  save(board: IGame): Promise<IGame>;
  find(id: number): Promise<IGame | null>;
  delete(id: number): Promise<DBDeletion>;
  getAll(): Promise<IGame[]>;
}
