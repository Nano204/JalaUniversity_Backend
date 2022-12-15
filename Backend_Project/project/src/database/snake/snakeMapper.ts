import { ISnake } from "../../domain/entities/ISnake";
import { Snake } from "./Snake";

export class snakeMapper {
  static toDBEntity(snake: ISnake) {
    const entitySnake: Snake = new Snake();
    entitySnake.head = JSON.stringify(snake.head);
    entitySnake.nodes = JSON.stringify(snake.nodes);
    entitySnake.direction = snake.direction;
    return entitySnake;
  }
  static toWorkUnit(snake: Snake) {
    const workSnake: ISnake = new ISnake();
    workSnake.id = snake.id;
    workSnake.direction = snake.direction;
    workSnake.nodes = JSON.parse(snake.nodes);
    workSnake.head = JSON.parse(snake.head);
    return workSnake;
  }
}
