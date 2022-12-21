import { Position } from "../types/types";
import GameDomain from "./GameDomain";

export class FoodDomain {
  public readonly id!: number;
  public position!: Position;
  public game!: GameDomain;
}
