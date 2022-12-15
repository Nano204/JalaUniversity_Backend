export type DBDeletion = { affected: number | null | undefined };
export type Position = { x: number; y: number };
export type SpaceStatus = "    " | "Head" | "Node" | "Food";
export type GameState = "Ready" | "Playing" | "Ended";

export enum Direction {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3,
}
