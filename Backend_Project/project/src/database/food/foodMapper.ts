import { IFood } from "../../domain/entities/IFood";
import { Food } from "./Food";

export class foodMapper {
  static toDBEntity(food: IFood) {
    const entityFood: Food = new Food();
    entityFood.position = JSON.stringify(food.position);
    return entityFood;
  }
  static toWorkUnit(food: Food) {
    const workFood: IFood = new IFood();
    workFood.id = food.id;
    workFood.position = JSON.parse(food.position);
    return workFood;
  }
}
