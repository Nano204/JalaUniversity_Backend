import { Position } from "../types/types";

export interface NodeDomain {
  position: Position;
  node: NodeDomain | null;
}
