import { Direction, Position, SnakeStatus } from "../types/types";
import { NodeDomain } from "./NodeDomain";

export class SnakeDomain {
  id!: number;
  head!: Position;
  direction!: Direction;
  status!: SnakeStatus;
  nodes!: NodeDomain | null | undefined;
  ownerId!: number;
  shadow?: Position;
  length!: number;
  gameId?: number;
}
