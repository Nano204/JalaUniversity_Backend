import { SnakeDomain } from "../../domain/entities/SnakeDomain";
import { Snake } from "./Snake";

export class snakeMapper {
  static toDBEntity(snake: SnakeDomain) {
    const entitySnake: Snake = new Snake();
    entitySnake.head = JSON.stringify(snake.head);
    entitySnake.nodes = JSON.stringify(snake.nodes);
    entitySnake.direction = snake.direction;
    entitySnake.status = snake.status;
    entitySnake.ownerId = snake.ownerId;
    entitySnake.length = snake.length;
    return entitySnake;
  }

  static toWorkUnit(snake: Snake) {
    const workSnake: SnakeDomain = new SnakeDomain();
    workSnake.id = snake.id;
    workSnake.direction = snake.direction;
    workSnake.nodes = JSON.parse(snake.nodes);
    workSnake.head = JSON.parse(snake.head);
    workSnake.ownerId = snake.ownerId;
    workSnake.status = snake.status;
    workSnake.length = snake.length;
    return workSnake;
  }
}
