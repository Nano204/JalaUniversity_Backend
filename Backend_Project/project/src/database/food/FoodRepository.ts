import { injectable } from "inversify";
import { FoodDomain } from "../../domain/entities/FoodDomain";
import { DBDeletion } from "../../domain/types/types";
import { FoodRepositoryInterface } from "../../domainRepository/FoodRepositoryInventory";
import { AppDataSource } from "../DBConnection";
import IdSetterRepository from "../idBuilder/IdSetterRepository";
import { Food } from "./Food";
import { foodMapper } from "./foodMapper";

@injectable()
export class FoodRepository implements FoodRepositoryInterface {
  async save(food: FoodDomain): Promise<FoodDomain> {
    const repository = AppDataSource.getRepository(Food);
    const dbFood = foodMapper.toDBEntity(food);
    if (!dbFood.id) {
      dbFood.id = await new IdSetterRepository().getNewId("Food");
    }
    const savedFood = await repository.save(dbFood);
    return foodMapper.toWorkUnit(savedFood);
  }

  async findById(id: number): Promise<FoodDomain> {
    const repository = AppDataSource.getRepository(Food);
    const responseFood = await repository.findOneBy({ id });
    if (!responseFood) {
      throw new Error("Not found");
    }
    return responseFood && foodMapper.toWorkUnit(responseFood);
  }

  async deleteById(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(Food);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }

  async findAll(): Promise<FoodDomain[]> {
    const repository = AppDataSource.getRepository(Food);
    const responsePromiseArray = await repository.find();
    const responseBoardArray = await Promise.all(
      responsePromiseArray.map((element) => {
        return foodMapper.toWorkUnit(element);
      })
    );
    return responseBoardArray;
  }
}
