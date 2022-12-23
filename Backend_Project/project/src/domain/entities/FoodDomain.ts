import { Position } from "../types/types";
import GameDomain from "./GameDomain";

export class FoodDomain {
  public id!: number;
  public position!: Position;
  public game!: GameDomain;
}
