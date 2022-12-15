import { IFood } from "../../domain/entities/IFood";
import { IFoodUnitOfWork } from "../../domainRepository/food/IFoodUnitOfWork";
import RandomNumberSupportService from "../support/RandomNumberUnitOfWorkService";


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
