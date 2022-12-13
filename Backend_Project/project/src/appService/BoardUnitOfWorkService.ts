import IBoard from "../domain/entities/IBoard";
import { IBoardUnitOfWork } from "../domainRepository/IBoardUnitOfWork";

export default class BoardUnitOfWorkService implements IBoardUnitOfWork {
  createBoard(size: number): IBoard {
    const board = new IBoard();
    board.coordinates = new Array(size).fill(Array(size).fill("    "));
    return board;
  }
}
