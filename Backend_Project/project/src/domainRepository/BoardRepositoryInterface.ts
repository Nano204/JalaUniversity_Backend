import BoardDomain from "../domain/entities/BoardDomain";
import { DBDeletion } from "../domain/types/types";

export interface BoardRepositoryInterface {
  save(board: BoardDomain): Promise<BoardDomain>;
  findById(id: number): Promise<BoardDomain>;
  deleteById(id: number): Promise<DBDeletion>;
  findAll(): Promise<BoardDomain[]>;
}
