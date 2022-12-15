import { ISnake } from "../../domain/entities/ISnake";
import { DBDeletion } from "../../domain/types/types";

export interface ISnakeRepository {
  save(snake: ISnake, gameId: number, userId: number): Promise<ISnake>;
  find(id: number): Promise<ISnake | null>;
  delete(id: number): Promise<DBDeletion>;
  getAll(): Promise<ISnake[]>;
}
