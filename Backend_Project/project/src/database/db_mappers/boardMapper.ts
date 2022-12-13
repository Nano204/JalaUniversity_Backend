import IBoard from "../../domain/entities/IBoard";
import { Board } from "../db_entities/Board";

export class boardMapper {
  static toDBEntity(board: IBoard) {
    const entityBoard: Board = new Board();
    entityBoard.coordinates = JSON.stringify(board.coordinates);
    return entityBoard;
  }
  static toWorkUnit(board: Board) {
    const workBoard: IBoard = new IBoard();
    workBoard.id = board.id;
    workBoard.coordinates = JSON.parse(board.coordinates);
    return workBoard;
  }
}
