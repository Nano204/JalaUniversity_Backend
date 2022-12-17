import { NodeDomain } from "../../domain/entities/NodeDomain";
import { SnakeDomain } from "../../domain/entities/SnakeDomain";
import { Position } from "../../domain/types/types";

export interface SnakeBehaviorServiceInterface {
  changeDirection(snake: SnakeDomain, direction: number): void;
  moveFollowingNodes(nodes: NodeDomain, position: Position): void;
  getLastNodePosition(snake: SnakeDomain): Position;
  findLastNode(nodes: NodeDomain | null): NodeDomain | null;
  setShadow(snake: SnakeDomain, shadow: Position): void;
  moveStep(snake: SnakeDomain, boundary: number): void;
  growUp(snake: SnakeDomain, position: Position): void;
  setHeadPosition(snake: SnakeDomain, boundary: number): void;
  killSnake(snake: SnakeDomain): void;
}
