import BoardDomain from "../../domain/entities/BoardDomain";
import { DBDeletion } from "../../domain/types/types";

export interface BoardServiceInterface {
  createNew(size: number): Promise<BoardDomain>;
  findBoard(id: number): Promise<BoardDomain | null>;
  deleteBoard(id: number): Promise<DBDeletion>;
  findAllBoards(): Promise<BoardDomain[]>;
}
