import GameDomain from "./GameDomain";
import { SnakeDomain } from "./SnakeDomain";

export class UserDomain {
  public readonly id!: number;
  public firstName!: string;
  public lastName!: string;
  public maxScore!: number;
  public games!: GameDomain[] | undefined;
  public snakes!: SnakeDomain[] | undefined;
}
