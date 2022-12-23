import { FoodDomain } from "../../domain/entities/FoodDomain";
import { gameMapper } from "../game/gameMapper";
import { Food } from "./Food";

export class foodMapper {
  static toDBEntity(food: FoodDomain) {
    const entityFood: Food = new Food();
    if (food.id) {
      entityFood.id = food.id;
    }
    entityFood.position = JSON.stringify(food.position);
    if (food.game) {
      entityFood.game = gameMapper.toDBEntity(food.game);
    }
    return entityFood;
  }

  static toWorkUnit(food: Food) {
    const workFood: FoodDomain = new FoodDomain();
    if (food.id) {
      workFood.id = food.id;
    }
    if (food.position) {
      workFood.position = JSON.parse(food.position);
    }
    if (food.game) {
      workFood.game = gameMapper.toWorkUnit(food.game);
    }
    return workFood;
  }
}
