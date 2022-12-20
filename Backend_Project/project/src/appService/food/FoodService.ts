import { inject, injectable } from "inversify";
import { DBDeletion } from "../../domain/types/types";
import SERVICE_IDENTIFIER from "../../dependencies/identifiers";
import { FoodDomain } from "../../domain/entities/FoodDomain";
import { FoodRepositoryInterface } from "../../domainRepository/FoodRepositoryInventory";
import { FoodServiceInterface } from "./FoodServiceInterface";
import RandomNumberSupportService from "../support/RandomNumberUnitOfWorkService";

const randomNumber = new RandomNumberSupportService().randomNumber;

@injectable()
export default class FoodService implements FoodServiceInterface {
  private foodRepository: FoodRepositoryInterface;

  constructor(
    @inject(SERVICE_IDENTIFIER.FOOD_DB_REPOSITORY) foodRepository: FoodRepositoryInterface
  ) {
    this.foodRepository = foodRepository;
  }

  async createNew(boundary: number): Promise<FoodDomain> {
    const newPosition = {
      x: randomNumber(boundary),
      y: randomNumber(boundary),
    };
    const food = new FoodDomain();
    food.position = newPosition;
    return await this.foodRepository.save(food);
  }

  async findFood(id: number): Promise<FoodDomain | null> {
    return await this.foodRepository.findById(id);
  }

  async deleteFood(id: number): Promise<DBDeletion> {
    return await this.foodRepository.deleteById(id);
  }

  async findAllFoods(): Promise<FoodDomain[]> {
    return await this.foodRepository.findAll();
  }
}
