import { FoodServiceInterface } from "../appService/food/FoodServiceInterface";
import { AppDataSource } from "../database/DBConnection";
import SERVICE_IDENTIFIER from "../dependencies/identifiers";
import container from "../dependencies/ioc_config";
import { FoodDomain } from "../domain/entities/FoodDomain";

describe("Food service testing", () => {
  const foodService = container.get<FoodServiceInterface>(
    SERVICE_IDENTIFIER.FOOD_SERVICE
  );

  let food: FoodDomain;

  beforeAll(async () => {
    await AppDataSource.connect();
    food = await foodService.createNew(9);
    await foodService.createNew(9);
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  it("Should return an FoodDomain when create a new food", async () => {
    foodService.createNew(10).then((reponse) => {
      expect(reponse instanceof FoodDomain).toBeTruthy();
    });
  });

  it("Should update an Food in DB and return a FoodDomain", async () => {
    const position = { x: 1, y: 2 };
    food.position = position;
    foodService.updateFood(food).then((response) => {
      expect(response.position).toEqual(position);
      expect(response instanceof FoodDomain).toBeTruthy();
    });
  });

  it("Should return an FoodDomain when finding a food", async () => {
    foodService.findFood(1).then((response) => {
      expect(response instanceof FoodDomain).toBeTruthy();
    });
  });

  it("Should throw error if not finding a food", () => {
    expect(foodService.findFood(4)).rejects.toThrowError();
  });

  it("Should return Delete object type when delete a food", async () => {
    foodService.deleteFood(2).then((response) => {
      expect(response.affected).toBe(1);
    });
  });

  it("Should return and Array when find all Foods", async () => {
    foodService.findAllFoods().then((response) => {
      expect(Array.isArray(response)).toBeTruthy();
    });
  });


});
