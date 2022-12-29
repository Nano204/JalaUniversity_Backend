import BoardDomain from "../../domain/entities/BoardDomain";
import { AppDataSource } from "../DBConnection";
import { Game } from "../game/Game";
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
      entityBoard.gameId = board.game.id;
    }
    return entityBoard;
  }

  static async toWorkUnit(board: Board) {
    const workBoard: BoardDomain = new BoardDomain();
    if (board.id) {
      workBoard.id = board.id;
    }
    if (board.coordinates) {
      workBoard.coordinates = JSON.parse(board.coordinates);
    }
    if (board.gameId) {
      const repository = AppDataSource.getRepository(Game);
      const gameEntity = await repository.findOneBy({ id: board.gameId });
      if (gameEntity) {
        workBoard.game = await gameMapper.toWorkUnit(gameEntity);
      }
    }
    return workBoard;
  }
}
