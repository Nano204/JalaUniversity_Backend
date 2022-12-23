import BoardDomain from "../../domain/entities/BoardDomain";
import { gameMapper } from "../game/gameMapper";
import { Board } from "./Board";

export class boardMapper {
  static toDBEntity(board: BoardDomain) {
    const entityBoard: Board = new Board();
    if (board.id) {
      entityBoard.id = board.id;
    }
    entityBoard.coordinates = JSON.stringify(board.coordinates);
    if (board.game) {
      entityBoard.game = gameMapper.toDBEntity(board.game);
    }
    return entityBoard;
  }

  static toWorkUnit(board: Board) {
    const workBoard: BoardDomain = new BoardDomain();
    if (board.id) {
      workBoard.id = board.id;
    }
    if (board.coordinates) {
      workBoard.coordinates = JSON.parse(board.coordinates);
    }
    if (board.game) {
      workBoard.game = gameMapper.toWorkUnit(board.game);
    }
    return workBoard;
  }
}
