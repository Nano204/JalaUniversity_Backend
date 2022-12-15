import IBoard from "../../domain/entities/IBoard";
import { DBDeletion } from "../../domain/types/types";

export interface IBoardRepository {
  save(board: IBoard): Promise<IBoard>;
  find(id: number): Promise<IBoard | null>;
  delete(id: number): Promise<DBDeletion>;
  getAll(): Promise<IBoard[]>;
}
