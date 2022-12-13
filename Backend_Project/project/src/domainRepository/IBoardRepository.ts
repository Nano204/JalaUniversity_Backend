import IBoard from "../domain/entities/IBoard";
import { DBDeletion } from "../domain/types/types";

export interface IBoardRepository {
  saveBoard(board: IBoard): Promise<IBoard>;
  findBoard(id: number): Promise<IBoard | null>;
  deleteBoard(id: number): Promise<DBDeletion>;
  getAllBoards(): Promise<IBoard[]>;
}
