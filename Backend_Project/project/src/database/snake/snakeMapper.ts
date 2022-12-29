import { SnakeDomain } from "../../domain/entities/SnakeDomain";
import { AppDataSource } from "../DBConnection";
import { Game } from "../game/Game";
import { gameMapper } from "../game/gameMapper";
import { User } from "../user/User";
import { userMapper } from "../user/userMapper";
import { Snake } from "./Snake";

export class snakeMapper {
  static toDBEntity(snake: SnakeDomain) {
    const entitySnake: Snake = new Snake();
    if (snake.id) {
      entitySnake.id = snake.id;
    }
    entitySnake.head = JSON.stringify(snake.head);
    entitySnake.direction = snake.direction;
    entitySnake.status = snake.status;
    entitySnake.nodes = JSON.stringify(snake.nodes);
    entitySnake.length = snake.length;
    entitySnake.nextNodeSpace = JSON.stringify(snake.nextNodeSpace);
    if (snake.user) {
      entitySnake.userId = snake.user.id;
    }
    if (snake.game) {
      entitySnake.gameId = snake.game.id;
    }
    return entitySnake;
  }

  static async toWorkUnit(snake: Snake) {
    const workSnake: SnakeDomain = new SnakeDomain();
    if (snake.id) {
      workSnake.id = snake.id;
    }
    if (snake.head) {
      workSnake.head = JSON.parse(snake.head);
    }
    workSnake.direction = snake.direction;
    workSnake.status = snake.status;
    if (snake.nodes) {
      workSnake.nodes = JSON.parse(snake.nodes);
    } else {
      workSnake.nodes = [];
    }
    workSnake.length = snake.length;
    if (snake.nextNodeSpace) {
      workSnake.nextNodeSpace = JSON.parse(snake.nextNodeSpace);
    }
    if (snake.userId) {
      const repository = AppDataSource.getRepository(User);
      const userEntity = await repository.findOneBy({ id: snake.userId });
      if (userEntity) {
        workSnake.user = await userMapper.toWorkUnit(userEntity);
      }
    }
    if (snake.gameId) {
      const repository = AppDataSource.getRepository(Game);
      const gameEntity = await repository.findOneBy({ id: snake.gameId });
      if (gameEntity) {
        workSnake.game = await gameMapper.toWorkUnit(gameEntity);
      }
    }
    return workSnake;
  }
}
