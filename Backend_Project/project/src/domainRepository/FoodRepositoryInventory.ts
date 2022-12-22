import { FoodDomain } from "../domain/entities/FoodDomain";
import { DBDeletion } from "../domain/types/types";

export interface FoodRepositoryInterface {
  save(food: FoodDomain): Promise<FoodDomain>;
  findById(id: number): Promise<FoodDomain>;
  deleteById(id: number): Promise<DBDeletion>;
  findAll(): Promise<FoodDomain[]>;
}
