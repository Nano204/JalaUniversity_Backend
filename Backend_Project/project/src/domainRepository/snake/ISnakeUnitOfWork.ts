import { ISnake } from "../../domain/entities/ISnake";

export interface ISnakeUnitOfWork {
  create(boundaryLimit: number): ISnake;
}
