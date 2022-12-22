export interface GameBehaviorServiceInterface {
  visualizeBoard(gameId: number): Promise<string>;
  // initializeGame(): Promise<GameDomain>;
  // getBoard(): Promise<SpaceStatus[][]>;
  // endGame(): Promise<GameDomain>;
  // restartGame(): Promise<GameDomain>;
}
