import { IFood } from "../domain/entities/IFood";

export interface IFoodUnitOfWork {
  create(): IFood;
}