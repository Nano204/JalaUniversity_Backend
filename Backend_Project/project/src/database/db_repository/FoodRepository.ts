import { injectable } from "inversify";
import { IFood } from "../../domain/entities/IFood";
import { DBDeletion } from "../../domain/types/types";
import { IFoodRepository } from "../../domainRepository/IFoodRepository";
import { AppDataSource } from "../DBConnection";
import { Food } from "../db_entities/Food";
import { foodMapper } from "../db_mappers/foodMapper";

@injectable()
export class FoodRepository implements IFoodRepository {
  async save(food: IFood): Promise<IFood> {
    const repository = AppDataSource.getRepository(Food);
    const dbBoard = foodMapper.toDBEntity(food);
    const responseBoard = await repository.save(dbBoard);
    return foodMapper.toWorkUnit(responseBoard);
  }
  async find(id: number): Promise<IFood | null> {
    const repository = AppDataSource.getRepository(Food);
    const responseBoard = await repository.findOneBy({ id });
    return responseBoard && foodMapper.toWorkUnit(responseBoard);
  }

  async delete(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(Food);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }

  async getAll(): Promise<IFood[]> {
    const repository = AppDataSource.getRepository(Food);
    const responseBoardArray = repository.find().then((boardsArray) => {
      return boardsArray.map((element) => {
        return foodMapper.toWorkUnit(element);
      });
    });
    return responseBoardArray;
  }
}
