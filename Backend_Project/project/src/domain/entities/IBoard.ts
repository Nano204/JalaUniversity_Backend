import { SpaceStatus } from "../types/types";

export default class IBoard {
  public id!: number;
  public coordinates!: SpaceStatus[][];
  public gameId!: number;
}
