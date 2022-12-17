import { FoodDomain } from "../../domain/entities/FoodDomain";
import { Food } from "./Food";

export class foodMapper {
  static toDBEntity(food: FoodDomain) {
    const entityFood: Food = new Food();
    entityFood.position = JSON.stringify(food.position);
    return entityFood;
  }
  static toWorkUnit(food: Food) {
    const workFood: FoodDomain = new FoodDomain();
    workFood.id = food.id;
    workFood.position = JSON.parse(food.position);
    return workFood;
  }
}
