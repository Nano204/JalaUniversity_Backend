import { IFood } from "../../domain/entities/IFood";
import { DBDeletion } from "../../domain/types/types";

export interface IFoodRepository {
  save(food: IFood): Promise<IFood>;
  find(id: number): Promise<IFood | null>;
  delete(id: number): Promise<DBDeletion>;
  getAll(): Promise<IFood[]>;
}
