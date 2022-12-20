import { injectable } from "inversify";
import { FoodDomain } from "../../domain/entities/FoodDomain";
import { DBDeletion } from "../../domain/types/types";
import { FoodRepositoryInterface } from "../../domainRepository/FoodRepositoryInventory";
import { AppDataSource } from "../DBConnection";
import { Food } from "./Food";
import { foodMapper } from "./foodMapper";

@injectable()
export class FoodRepository implements FoodRepositoryInterface {
  async save(food: FoodDomain): Promise<FoodDomain> {
    const repository = AppDataSource.getRepository(Food);
    const dbBoard = foodMapper.toDBEntity(food);
    const responseBoard = await repository.save(dbBoard);
    return foodMapper.toWorkUnit(responseBoard);
  }
  
  async findById(id: number): Promise<FoodDomain | null> {
    const repository = AppDataSource.getRepository(Food);
    const responseBoard = await repository.findOneBy({ id });
    return responseBoard && foodMapper.toWorkUnit(responseBoard);
  }

  async deleteById(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(Food);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }

  async findAll(): Promise<FoodDomain[]> {
    const repository = AppDataSource.getRepository(Food);
    const responseFoodsArray = repository.find().then((foodsArray) => {
      return foodsArray.map((element) => {
        return foodMapper.toWorkUnit(element);
      });
    });
    return responseFoodsArray;
  }
}
