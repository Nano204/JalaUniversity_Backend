import SERVICE_IDENTIFIER from "../../../dependencies/identifiers";
import container from "../../../dependencies/ioc_config";
import { SnakeDomain } from "../../../domain/entities/SnakeDomain";
import Exceptions from "../../../domain/exceptions/Exception";
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

  private async setNextNodeSpace(snakeId: number): Promise<SnakeDomain | void> {
    const snake = await this.snakeService.findSnake(snakeId);
    if (snake) {
      if (snake.nodes.length) {
        const length = snake.nodes.length;
        snake.nextNodeSpace = snake.nodes[length - 1];
      } else {
        snake.nextNodeSpace = snake.head;
      }
      return await this.snakeService.updateSnake(snake);
    } else {
      new Exceptions().itemNotFoundException("Snake", snakeId);
    }
  }

  private async moveFollowingNodes(snakeId: number): Promise<SnakeDomain | void> {
    const snake = await this.snakeService.findSnake(snakeId);
    if (snake) {
      if (snake.nodes.length) {
        for (let i = snake.nodes.length - 1; i > 0; i--) {
          snake.nodes[i] = snake.nodes[i - 1];
        }
        snake.nodes[0] = snake.head;
        return await this.snakeService.updateSnake(snake);
      }
      return await this.snakeService.updateSnake(snake);
    } else {
      new Exceptions().itemNotFoundException("Snake", snakeId);
    }
  }

  async setOwner(snakeId: number, ownerId: number): Promise<SnakeDomain | void> {
    const snake = await this.snakeService.findSnake(snakeId);
    if (snake) {
      const user = await this.userService.findUser(ownerId);
      if (user) {
        snake.user = user;
        return await this.snakeService.updateSnake(snake);
      } else {
        new Exceptions().itemNotFoundException("User", ownerId);
      }
    } else {
      new Exceptions().itemNotFoundException("Snake", snakeId);
    }
  }

  async setDirection(
    snakeId: number,
    direction: "up" | "down" | "left" | "right"
  ): Promise<SnakeDomain | void> {
    const snake = await this.snakeService.findSnake(snakeId);
    if (snake) {
      const directionValidation = this.areNotContaryDirection(
        snake.direction,
        Direction[direction]
      );
      if (directionValidation) {
        snake.direction = Direction[direction];
      }
      return await this.snakeService.updateSnake(snake);
    } else {
      new Exceptions().itemNotFoundException("Snake", snakeId);
    }
  }

  async setHeadPosition(snakeId: number, boundary: number): Promise<SnakeDomain | void> {
    const snake = await this.snakeService.findSnake(snakeId);
    if (snake) {
      const coordianteX = this.randomNumber(boundary);
      const coordianteY = this.randomNumber(boundary);
      snake.head = { x: coordianteX, y: coordianteY };
      return await this.snakeService.updateSnake(snake);
    } else {
      new Exceptions().itemNotFoundException("Snake", snakeId);
    }
  }

  async moveStep(snakeId: number, boundary: number): Promise<SnakeDomain | void> {
    await this.setNextNodeSpace(snakeId);
    await this.moveFollowingNodes(snakeId);
    const snake = await this.snakeService.findSnake(snakeId);
    if (snake) {
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
    } else {
      new Exceptions().itemNotFoundException("Snake", snakeId);
    }
  }

  async growUp(snakeId: number): Promise<SnakeDomain | void> {
    const snake = await this.snakeService.findSnake(snakeId);
    if (snake) {
      if (snake.nextNodeSpace) {
        ++snake.length;
        snake.nodes.push(snake.nextNodeSpace);
      }
      return await this.snakeService.updateSnake(snake);
    } else {
      new Exceptions().itemNotFoundException("Snake", snakeId);
    }
  }

  async killSnake(snakeId: number): Promise<SnakeDomain | void> {
    const snake = await this.snakeService.findSnake(snakeId);
    if (snake) {
      snake.status = "Death";
      return await this.snakeService.updateSnake(snake);
    } else {
      new Exceptions().itemNotFoundException("Snake", snakeId);
    }
  }
}
