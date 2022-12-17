import { SpaceStatus } from "../types/types";

export default class BoardDomain {
  public id!: number;
  public coordinates!: SpaceStatus[][];
  public gameId!: number;
}
