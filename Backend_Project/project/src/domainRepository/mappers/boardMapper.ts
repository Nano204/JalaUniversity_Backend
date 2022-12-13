import { Board } from "../../database/db_entities/Board";
import IBoard from "../../domain/entities/IBoard";

export class BoardMapper {
  static toDomain(raw: Board): IBoard {
    const board = new IBoard(raw.sideLenght);
    board.id = raw.id;
  }
}
