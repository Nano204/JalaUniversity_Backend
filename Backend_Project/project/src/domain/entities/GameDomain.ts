import { GameState } from "../types/types";
import BoardDomain from "./BoardDomain";
import { FoodDomain } from "./FoodDomain";
import { SnakeDomain } from "./SnakeDomain";
import { UserDomain } from "./UserDomain";

export default class GameDomain {
  public readonly id!: number;
  public state!: GameState;
  public speed!: number;
  public size!: number;
  public users!: UserDomain[];
  public board!: BoardDomain;
  public snakes!: SnakeDomain[];
  public food!: FoodDomain;
}
