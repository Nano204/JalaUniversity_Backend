import { Position } from "../types/types";
import { INode } from "./INode";

export class ISnake {
  id!: number;
  head!: Position;
  nodes!: INode[];
  // boardID!: number;
  // ownerID!: number;
}
