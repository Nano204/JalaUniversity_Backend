import IGame from "../../domain/entities/IGame";

export interface IGameUnitOfWork {
  create(speed: number): IGame;
}
