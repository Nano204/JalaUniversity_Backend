import { Direction, Position, SnakeStatus } from "../types/types";
import GameDomain from "./GameDomain";
import { UserDomain } from "./UserDomain";

export class SnakeDomain {
  public readonly id!: number;
  public head!: Position;
  public direction!: Direction;
  public status!: SnakeStatus;
  public nodes!: Position[];
  public length!: number;
  public nextNodeSpace!: Position | undefined;
  public user!: UserDomain | undefined;
  public game!: GameDomain | undefined;
}
