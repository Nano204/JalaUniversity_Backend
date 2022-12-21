import { FoodDomain } from "../../domain/entities/FoodDomain";
import { gameMapper } from "../game/gameMapper";
import { Food } from "./Food";

export class foodMapper {
  static toDBEntity(food: FoodDomain) {
    const entityFood: Food = new Food();
    entityFood.position = JSON.stringify(food.position);
    if (food.game) {
      entityFood.game = gameMapper.toDBEntity(food.game);
    }
    if (food.id) {
      return { ...entityFood, id: food.id };
    }
    return entityFood;
  }

  static toWorkUnit(food: Food) {
    const workFood: FoodDomain = new FoodDomain();
    workFood.position = JSON.parse(food.position);
    if (food.game) {
      workFood.game = gameMapper.toWorkUnit(food.game);
    }
    if (food.id) {
      return { ...workFood, id: food.id };
    }
    return workFood;
  }
}
