import { SnakeDomain } from "../../domain/entities/SnakeDomain";
import { gameMapper } from "../game/gameMapper";
import { userMapper } from "../user/userMapper";
import { Snake } from "./Snake";

export class snakeMapper {
  static toDBEntity(snake: SnakeDomain) {
    const entitySnake: Snake = new Snake();
    entitySnake.head = JSON.stringify(snake.head);
    entitySnake.direction = snake.direction;
    entitySnake.status = snake.status;
    entitySnake.nodes = JSON.stringify(snake.nodes);
    entitySnake.length = snake.length;
    entitySnake.nextNodeSpace = JSON.stringify(snake.nextNodeSpace);
    if (snake.user) {
      entitySnake.user = userMapper.toDBEntity(snake.user);
    }
    if (snake.game) {
      entitySnake.game = gameMapper.toDBEntity(snake.game);
    }
    if (snake.id) {
      return { ...entitySnake, id: snake.id };
    }
    return entitySnake;
  }

  static toWorkUnit(snake: Snake) {
    const workSnake: SnakeDomain = new SnakeDomain();
    workSnake.head = JSON.parse(snake.head);
    workSnake.direction = snake.direction;
    workSnake.status = snake.status;
    workSnake.nodes = JSON.parse(snake.nodes);
    workSnake.length = snake.length;
    workSnake.nextNodeSpace = JSON.parse(snake.nextNodeSpace);
    if (snake.user) {
      workSnake.user = userMapper.toWorkUnit(snake.user);
    }
    if (snake.game) {
      workSnake.game = gameMapper.toWorkUnit(snake.game);
    }
    if (snake.id) {
      return { ...workSnake, id: snake.id };
    }
    return workSnake;
  }
}
