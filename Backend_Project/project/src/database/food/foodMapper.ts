import { FoodDomain } from "../../domain/entities/FoodDomain";
import { AppDataSource } from "../DBConnection";
import { Game } from "../game/Game";
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
      entityFood.gameId = food.game.id;
    }
    return entityFood;
  }

  static async toWorkUnit(food: Food) {
    const workFood: FoodDomain = new FoodDomain();
    if (food.id) {
      workFood.id = food.id;
    }
    if (food.position) {
      workFood.position = JSON.parse(food.position);
    }
    if (food.gameId) {
      const repository = AppDataSource.getRepository(Game);
      const gameEntity = await repository.findOneBy({ id: food.gameId });
      if (gameEntity) {
        workFood.game = await gameMapper.toWorkUnit(gameEntity);
      }
    }
    return workFood;
  }
}
