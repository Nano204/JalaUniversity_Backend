import { FoodDomain } from "../../domain/entities/FoodDomain";
import { DBDeletion } from "../../domain/types/types";

export interface FoodServiceInterface {
  createNew(boundary: number): Promise<FoodDomain>;
  updateFood(food: FoodDomain): Promise<FoodDomain>;
  findFood(id: number): Promise<FoodDomain>;
  deleteFood(id: number): Promise<DBDeletion>;
  findAllFoods(): Promise<FoodDomain[]>;
}
