import { SpaceStatus } from "../../../domain/types/types";

export interface GameBehaviorServiceInterface {
  locateSnakesonBoard(): void;
  createNewFood(): void;
  locateFoodOnBoard(): void;
  initializeGame(): void;
  getBoard(): SpaceStatus[][];
  endGame(): void;
  restartGame(): void;
}
