import SERVICE_IDENTIFIER from "../../../dependencies/identifiers";
import container from "../../../dependencies/ioc_config";
import { SnakeDomain } from "../../../domain/entities/SnakeDomain";
import { UserDomain } from "../../../domain/entities/UserDomain";
import { Direction, Position } from "../../../domain/types/types";
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

  comparePositions(position1: Position, position2: Position): boolean {
    const { x: x1, y: y1 } = position1;
    const { x: x2, y: y2 } = position2;
    if (x1 == x2 && y1 == y2) {
      return true;
    }
    return false;
  }

  private nextPosition(
    position: Position,
    direction: Direction,
    boundary: number
  ): Position {
    if (direction == Direction.up) {
      position.y = position.y < boundary ? ++position.y : 0;
    } else if (direction == Direction.down) {
      position.y = position.y > 0 ? --position.y : boundary;
    } else if (direction == Direction.right) {
      position.x = position.x < boundary ? ++position.x : 0;
    } else if (direction == Direction.left) {
      position.x = position.x > 0 ? --position.x : boundary;
    }
    return position;
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

  private async updateOwnerMaxScore(snakeId: number): Promise<UserDomain> {
    const snake = await this.snakeService.findSnake(snakeId);
    const ownerId = await this.snakeService.findSnakeOwnerId(snakeId);
    const user = await this.userService.findUser(ownerId);
    if (user.maxScore < snake.length) {
      user.maxScore = snake.length;
    }
    return await this.userService.updateUser(user);
  }

  private validateDirectionAvailable(snake: SnakeDomain, boundary: number): boolean {
    const { head, direction, nodes } = snake;
    const position = { ...head };
    if (!nodes.length) {
      return true;
    }
    const nextPosition = this.nextPosition(position, direction, boundary);
    const directionToNode = this.comparePositions(nextPosition, nodes[0]);
    if (directionToNode) {
      return false;
    }
    return true;
  }

  contraryDirection(direction: Direction): Direction {
    if (direction == Direction.up) {
      return Direction.down;
    }
    if (direction == Direction.down) {
      return Direction.up;
    }
    if (direction == Direction.left) {
      return Direction.right;
    }
    if (direction == Direction.right) {
      return Direction.left;
    }
    return direction;
  }

  directionMapper(direction: "up" | "down" | "left" | "right"): Direction {
    return Direction[direction];
  }

  async setOwner(snakeId: number, ownerId: number): Promise<SnakeDomain> {
    const snake = await this.snakeService.findSnake(snakeId);
    const user = await this.userService.findUser(ownerId);
    snake.user = user;
    return await this.snakeService.updateSnake(snake);
  }

  async setDirection(snakeId: number, direction: Direction): Promise<SnakeDomain> {
    const snake = await this.snakeService.findSnake(snakeId);
    snake.direction = direction;
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
    let snake = await this.snakeService.findSnake(snakeId);
    const availableDirectionCheck = this.validateDirectionAvailable(snake, boundary);
    await this.setNextNodeSpace(snakeId);
    await this.moveFollowingNodes(snakeId);
    snake = await this.snakeService.findSnake(snakeId);
    if (!availableDirectionCheck) {
      const contraryDirection = this.contraryDirection(snake.direction);
      snake = await this.setDirection(snake.id, contraryDirection);
    }
    snake.head = this.nextPosition(snake.head, snake.direction, boundary);
    return await this.snakeService.updateSnake(snake);
  }

  async growUp(snakeId: number): Promise<SnakeDomain> {
    const snake = await this.snakeService.findSnake(snakeId);
    if (snake.nextNodeSpace) {
      ++snake.length;
      snake.nodes.push(snake.nextNodeSpace);
    }
    const growedSnake = await this.snakeService.updateSnake(snake);
    await this.updateOwnerMaxScore(snakeId);
    return growedSnake;
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
    snake.head = { x: NaN, y: NaN };
    snake.nodes = [];
    await this.updateOwnerMaxScore(snakeId);
    return await this.snakeService.updateSnake(snake);
  }

  async buildNewSnake(ownerId: number, boundary: number): Promise<SnakeDomain> {
    const snake = await this.snakeService.createNew();
    await this.setHeadPosition(snake.id, boundary);
    await this.setOwner(snake.id, ownerId);
    return await this.restartSnake(snake.id, boundary);
  }
}
