import { GameState } from "../types/types";

export default class GameDomain {
  public id!: number;
  public speed!: number; //movesPerSecond
  public state!: GameState;
}
