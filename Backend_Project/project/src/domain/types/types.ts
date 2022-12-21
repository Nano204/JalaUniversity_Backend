export type DBDeletion = { affected: number | null | undefined };
export type Position = { x: number; y: number };
export type SpaceStatus = "0" | "H" | "N" | "F";
export type GameState = "Ready" | "Playing" | "Ended";
export type SnakeStatus = "Alive" | "Death";

export enum Direction {
  up = 0,
  down = 1,
  left = 2,
  right = 3,
}
