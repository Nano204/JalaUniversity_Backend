import { SpaceStatus } from "../types/types";
import GameDomain from "./GameDomain";

export default class BoardDomain {
  public readonly id!: number;
  public coordinates!: SpaceStatus[][];
  public game!: GameDomain;
}
