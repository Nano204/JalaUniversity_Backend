import IGame from "../../domain/entities/IGame";
import { DBDeletion } from "../../domain/types/types";

export interface IGameRepository {
  add(game: IGame, usersIdArray: number[]): Promise<IGame>;
  find(id: number): Promise<IGame | null>;
  delete(id: number): Promise<DBDeletion>;
  getAll(): Promise<IGame[]>;
}
