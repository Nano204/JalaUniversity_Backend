import { SnakeDomain } from "../../domain/entities/SnakeDomain";
import { DBDeletion } from "../../domain/types/types";

export interface SnakeServiceInterface {
  createNew(): Promise<SnakeDomain>;
  updateSnake(snake: SnakeDomain): Promise<SnakeDomain>;
  findSnake(id: number): Promise<SnakeDomain>;
  deleteSnake(id: number): Promise<DBDeletion>;
  findAllSnakes(): Promise<SnakeDomain[]>;
}
