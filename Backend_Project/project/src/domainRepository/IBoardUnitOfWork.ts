import IBoard from "../domain/entities/IBoard";

export interface IBoardUnitOfWork {
  create(size: number): IBoard;
}
