import { GameState } from "../types/types";

export default class IGame {
  public id!: number;
  public speed!: number; //movesPerSecond
  public state!: GameState;
}
