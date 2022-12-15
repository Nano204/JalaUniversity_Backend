import { inject, injectable } from "inversify";
import { DBDeletion } from "../../domain/types/types";
import SERVICE_IDENTIFIER from "../../dependencies/constants/identifiers";
import { IFood } from "../../domain/entities/IFood";
import { IFoodRepository } from "../../domainRepository/food/IFoodRepository";

@injectable()
export default class FoodService implements IFoodRepository {
  private foodRepository: IFoodRepository;

  constructor(
    @inject(SERVICE_IDENTIFIER.FOOD_DB_REPOSITORY) foodRepository: IFoodRepository
  ) {
    this.foodRepository = foodRepository;
  }
  async save(board: IFood): Promise<IFood> {
    return await this.foodRepository.save(board);
  }
  async find(id: number): Promise<IFood | null> {
    return await this.foodRepository.find(id);
  }
  async delete(id: number): Promise<DBDeletion> {
    return await this.foodRepository.delete(id);
  }
  async getAll(): Promise<IFood[]> {
    return await this.foodRepository.getAll();
  }
}
