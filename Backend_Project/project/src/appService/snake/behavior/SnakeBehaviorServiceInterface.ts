import { NodeDomain } from "../../../domain/entities/NodeDomain";
import { Position } from "../../../domain/types/types";


export interface SnakeBehaviorServiceInterface {
  setOwner(ownerId: number): void;
  changeDirection(direction: number): void;
  moveFollowingNodes(nodes: NodeDomain, position: Position): void;
  getLastNodePosition(): Position;
  findLastNode(nodes: NodeDomain): NodeDomain | null;
  setShadow(shadow: Position): void;
  moveStep(boundary: number): void;
  growUp(position: Position): void;
  setHeadPosition(boundary: number): void;
  killSnake(): void;
}
