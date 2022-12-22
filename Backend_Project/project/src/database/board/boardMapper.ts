import BoardDomain from "../../domain/entities/BoardDomain";
import { gameMapper } from "../game/gameMapper";
import { Board } from "./Board";

export class boardMapper {
  static toDBEntity(board: BoardDomain) {
    const entityBoard: Board = new Board();
    entityBoard.coordinates = JSON.stringify(board.coordinates);
    if (board.game) {
      entityBoard.game = gameMapper.toDBEntity(board.game);
    }
    if (board.id) {
      return { ...entityBoard, id: board.id };
    }
    return entityBoard;
  }
  
  static toWorkUnit(board: Board) {
    const workBoard: BoardDomain = new BoardDomain();
    workBoard.coordinates = JSON.parse(board.coordinates);
    if (board.game) {
      workBoard.game = gameMapper.toWorkUnit(board.game);
    }
    if (board.id) {
      return { ...workBoard, id: board.id };
    }
    return workBoard;
  }
}
