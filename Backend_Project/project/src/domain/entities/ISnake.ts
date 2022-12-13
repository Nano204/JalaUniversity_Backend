import { Position } from "../types/types";
import IBoard from "./IBoard";
import { INode } from "./INode";
import { IUser } from "./IUser";

export interface ISnake {
  readonly id: number;
  readonly head: Position;
  readonly nodes: INode[];
  readonly board: IBoard;
  readonly owner: IUser;
}
