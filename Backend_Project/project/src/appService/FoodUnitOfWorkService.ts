import { IFood } from "../domain/entities/IFood";
import { IFoodUnitOfWork } from "../domainRepository/IFoodUnitOfWork";
import RandomNumberSupportService from "./RandomNumberUnitOfWorkService";

export default class FoodUnitOfWorkService implements IFoodUnitOfWork {
  create(): IFood {
    const food = new IFood();
    const randNum = new RandomNumberSupportService().randomNumber;
    food.position = {
      x: randNum(10),
      y: randNum(10),
    };
    return food;
  }
}
