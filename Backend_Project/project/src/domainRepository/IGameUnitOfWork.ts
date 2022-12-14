import IGame from "../domain/entities/IGame";

export interface IGameUnitOfWork {
  createGame(size: number, users: number[]): Promise<IGame>;
}
