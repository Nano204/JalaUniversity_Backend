import BoardDomain from "../../domain/entities/BoardDomain";
import { Board } from "./Board";

export class boardMapper {
  static toDBEntity(board: BoardDomain) {
    const entityBoard: Board = new Board();
    entityBoard.coordinates = JSON.stringify(board.coordinates);
    return entityBoard;
  }
  static toWorkUnit(board: Board) {
    const workBoard: BoardDomain = new BoardDomain();
    workBoard.id = board.id;
    workBoard.coordinates = JSON.parse(board.coordinates);
    return workBoard;
  }
}
