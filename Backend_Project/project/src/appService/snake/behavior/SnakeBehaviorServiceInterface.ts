import { SnakeDomain } from "../../../domain/entities/SnakeDomain";

export interface SnakeBehaviorServiceInterface {
  setOwner(snakeId: number, ownerId: number): Promise<SnakeDomain | void>;
  setDirection(
    snakeId: number,
    direction: "up" | "down" | "left" | "right"
  ): Promise<SnakeDomain | void>;
  setHeadPosition(snakeId: number, boundary: number): Promise<SnakeDomain | void>;
  moveStep(snakeId: number, boundary: number): Promise<SnakeDomain | void>;
  growUp(snakeId: number): Promise<SnakeDomain | void>;
  restartSnake(snakeId: number, boundary: number): Promise<SnakeDomain | void>;
  killSnake(snakeId: number): Promise<SnakeDomain | void>;
}
