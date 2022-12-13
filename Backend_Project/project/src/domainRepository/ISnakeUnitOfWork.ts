import { ISnake } from "../domain/entities/ISnake";

export interface ISnakeUnitOfWork {
  createSnake(): ISnake;
}
