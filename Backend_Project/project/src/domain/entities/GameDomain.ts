import { GameState } from "../types/types";
import BoardDomain from "./BoardDomain";
import { FoodDomain } from "./FoodDomain";
import { SnakeDomain } from "./SnakeDomain";
import { UserDomain } from "./UserDomain";

export default class GameDomain {
  public id?: number;
  public speed!: number;
  public state!: GameState;
  public users?: UserDomain[];
  public board?: BoardDomain;
  public snakes?: SnakeDomain[];
  public size?: number;
  public food?: FoodDomain;
}
