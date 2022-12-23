import { SpaceStatus } from "../types/types";
import GameDomain from "./GameDomain";

export default class BoardDomain {
  public id!: number;
  public coordinates!: SpaceStatus[][];
  public game!: GameDomain;
}
