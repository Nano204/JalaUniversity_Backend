import { ISnake } from "../../domain/entities/ISnake";
import { Snake } from "../db_entities/Snake";

export class snakeMapper {
  static toDBEntity(snake: ISnake) {
    const entitySnake: Snake = new Snake();
    entitySnake.head = JSON.stringify(snake.head);
    return entitySnake;
  }
  static toWorkUnit(snake: Snake) {
    const workSnake: ISnake = new ISnake();
    workSnake.id = snake.id;
    workSnake.head = JSON.parse(snake.head);
    return workSnake;
  }
}
