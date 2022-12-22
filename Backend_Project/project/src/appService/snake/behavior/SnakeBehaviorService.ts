import SERVICE_IDENTIFIER from "../../../dependencies/identifiers";
import container from "../../../dependencies/ioc_config";
import { SnakeDomain } from "../../../domain/entities/SnakeDomain";
import { Direction } from "../../../domain/types/types";
import RandomNumberSupportService from "../../support/RandomNumberUnitOfWorkService";
import { UserServiceInterface } from "../../user/UserServiceInterface";
import { SnakeServiceInterface } from "../SnakeServiceInterface";
import { SnakeBehaviorServiceInterface } from "./SnakeBehaviorServiceInterface";

export default class SnakeBehaviorService implements SnakeBehaviorServiceInterface {
  private snakeService = container.get<SnakeServiceInterface>(
    SERVICE_IDENTIFIER.SNAKE_SERVICE
  );

  private userService = container.get<UserServiceInterface>(
    SERVICE_IDENTIFIER.USER_SERVICE
  );

  private randomNumber = new RandomNumberSupportService().randomNumber;

  private areNotContaryDirection(
    currentDirection: Direction,
    newDirection: Direction
  ): boolean {
    return !(
      (currentDirection == Direction.up && newDirection == Direction.down) ||
      (currentDirection == Direction.down && newDirection == Direction.up) ||
      (currentDirection == Direction.left && newDirection == Direction.right) ||
      (currentDirection == Direction.right && newDirection == Direction.left)
    );
  }

  private async setNextNodeSpace(snakeId: number): Promise<SnakeDomain> {
    const snake = await this.snakeService.findSnake(snakeId);
    if (snake.nodes.length) {
      const length = snake.nodes.length;
      snake.nextNodeSpace = snake.nodes[length - 1];
    } else {
      snake.nextNodeSpace = snake.head;
    }
    return await this.snakeService.updateSnake(snake);
  }

  private async moveFollowingNodes(snakeId: number): Promise<SnakeDomain> {
    const snake = await this.snakeService.findSnake(snakeId);
    if (snake.nodes.length) {
      for (let i = snake.nodes.length - 1; i > 0; i--) {
        snake.nodes[i] = snake.nodes[i - 1];
      }
      snake.nodes[0] = snake.head;
      return await this.snakeService.updateSnake(snake);
    }
    return await this.snakeService.updateSnake(snake);
  }

  async setOwner(snakeId: number, ownerId: number): Promise<SnakeDomain> {
    const snake = await this.snakeService.findSnake(snakeId);
    const user = await this.userService.findUser(ownerId);
    snake.user = user;
    return await this.snakeService.updateSnake(snake);
  }

  async setDirection(
    snakeId: number,
    direction: "up" | "down" | "left" | "right"
  ): Promise<SnakeDomain> {
    const snake = await this.snakeService.findSnake(snakeId);

    const directionValidation = this.areNotContaryDirection(
      snake.direction,
      Direction[direction]
    );
    if (directionValidation) {
      snake.direction = Direction[direction];
    }
    return await this.snakeService.updateSnake(snake);
  }

  async setHeadPosition(snakeId: number, boundary: number): Promise<SnakeDomain> {
    const snake = await this.snakeService.findSnake(snakeId);
    const coordianteX = this.randomNumber(boundary);
    const coordianteY = this.randomNumber(boundary);
    snake.head = { x: coordianteX, y: coordianteY };
    return await this.snakeService.updateSnake(snake);
  }

  async moveStep(snakeId: number, boundary: number): Promise<SnakeDomain> {
    await this.setNextNodeSpace(snakeId);
    await this.moveFollowingNodes(snakeId);
    const snake = await this.snakeService.findSnake(snakeId);
    const headPostion = snake.head;
    if (snake.direction == Direction.up) {
      headPostion.y = headPostion.y < boundary ? ++headPostion.y : 0;
    } else if (snake.direction == Direction.down) {
      headPostion.y = headPostion.y > 0 ? --headPostion.y : boundary;
    } else if (snake.direction == Direction.right) {
      headPostion.x = headPostion.x < boundary ? ++headPostion.x : 0;
    } else if (snake.direction == Direction.left) {
      headPostion.x = headPostion.x > 0 ? --headPostion.x : boundary;
    }
    snake.head = headPostion;
    return await this.snakeService.updateSnake(snake);
  }

  async growUp(snakeId: number): Promise<SnakeDomain> {
    const snake = await this.snakeService.findSnake(snakeId);
    if (snake.nextNodeSpace) {
      ++snake.length;
      snake.nodes.push(snake.nextNodeSpace);
    }
    return await this.snakeService.updateSnake(snake);
  }

  async restartSnake(snakeId: number, boundary: number): Promise<SnakeDomain> {
    await this.setHeadPosition(snakeId, boundary);
    const snake = await this.snakeService.findSnake(snakeId);
    snake.status = "Alive";
    snake.nodes = [];
    snake.length = 1;
    snake.nextNodeSpace = undefined;
    const maxDirectionIndex = 3;
    snake.direction = this.randomNumber(maxDirectionIndex);
    return await this.snakeService.updateSnake(snake);
  }

  async killSnake(snakeId: number): Promise<SnakeDomain> {
    const snake = await this.snakeService.findSnake(snakeId);
    snake.status = "Death";
    return await this.snakeService.updateSnake(snake);
  }

  async buildNewSnake(ownerId: number, boundary: number): Promise<SnakeDomain> {
    const snake = await this.snakeService.createNew();
    await this.setHeadPosition(snake.id, boundary);
    await this.setOwner(snake.id, ownerId);
    return (await this.restartSnake(snake.id, boundary)) || snake;
  }
}
