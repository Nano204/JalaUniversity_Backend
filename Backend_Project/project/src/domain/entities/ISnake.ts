import { Direction, Position } from "../types/types";
import { INode } from "./INode";

export class ISnake {
  id!: number;
  head!: Position;
  direction!: Direction;
  nodes!: INode[];
}
