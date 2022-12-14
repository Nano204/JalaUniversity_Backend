import { Position } from "../types/types";
import { INode } from "./INode";

export class ISnake {
  id!: number;
  head!: Position;
  nodes!: INode[];
  gameId!: number;
  ownerId!: number;
}
