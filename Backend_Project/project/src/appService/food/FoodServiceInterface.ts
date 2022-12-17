import { FoodDomain } from "../../domain/entities/FoodDomain";
import { DBDeletion } from "../../domain/types/types";

export interface FoodServiceInterface {
  createNew(boundary: number): Promise<FoodDomain>;
  findFood(id: number): Promise<FoodDomain | null>;
  deleteFood(id: number): Promise<DBDeletion>;
  findAllFoods(): Promise<FoodDomain[]>;
}
