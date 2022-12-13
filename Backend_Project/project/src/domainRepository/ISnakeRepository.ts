import { ISnake } from "../domain/entities/ISnake";
import { DBDeletion } from "../domain/types/types";

export interface ISnakeRepository {
  createSnake(snake: ISnake): Promise<ISnake>;
  findSnake(id: number): Promise<ISnake | null>;
  deleteSnake(id: number): Promise<DBDeletion>;
  getAllSnakes(): Promise<ISnake[]>;
}