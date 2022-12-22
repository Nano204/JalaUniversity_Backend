import BoardDomain from "../../domain/entities/BoardDomain";
import { DBDeletion } from "../../domain/types/types";

export interface BoardServiceInterface {
  createNew(size: number): Promise<BoardDomain>;
  updateBoard(board: BoardDomain): Promise<BoardDomain>;
  findBoard(id: number): Promise<BoardDomain>;
  deleteBoard(id: number): Promise<DBDeletion>;
  findAllBoards(): Promise<BoardDomain[]>;
}
