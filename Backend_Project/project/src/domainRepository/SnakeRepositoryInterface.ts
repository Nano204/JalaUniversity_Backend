import { SnakeDomain } from "../domain/entities/SnakeDomain";
import { DBDeletion } from "../domain/types/types";

export interface SnakeRepositoryInterface {
  save(snake: SnakeDomain): Promise<SnakeDomain>;
  findById(id: number): Promise<SnakeDomain>;
  findByIdWithRelations(id: number): Promise<SnakeDomain>;
  deleteById(id: number): Promise<DBDeletion>;
  findAll(): Promise<SnakeDomain[]>;
}
