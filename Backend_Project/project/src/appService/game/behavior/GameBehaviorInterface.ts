import { Position, SpaceStatus } from "../../../domain/types/types";

export interface GameBehaviorServiceInterface {
  locateSnakesonBoard(): void;
  locateFoodOnBoard(): void;
  initializeGame(): void;
  getBoard(): SpaceStatus[][];
  endGame(): void;
  restartGame(): void;
  newPosition(): Position;
  clearBoard(): void;
}
