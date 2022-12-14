import { injectable } from "inversify";
import { ISnake } from "../../domain/entities/ISnake";
import { DBDeletion } from "../../domain/types/types";
import { ISnakeRepository } from "../../domainRepository/ISnakeRepository";
import { AppDataSource } from "../DBConnection";
import { Snake } from "../db_entities/Snake";
import { snakeMapper } from "../db_mappers/snakeMapper";

@injectable()
export class SnakeRepository implements ISnakeRepository {
  async save(snake: ISnake): Promise<ISnake> {
    const repository = AppDataSource.getRepository(Snake);
    const dbSnake = snakeMapper.toDBEntity(snake);
    const responseSnake = await repository.save(dbSnake);
    return snakeMapper.toWorkUnit(responseSnake);
  }
  async find(id: number): Promise<ISnake | null> {
    const repository = AppDataSource.getRepository(Snake);
    const responseSnake = await repository.findOneBy({ id });
    return responseSnake && snakeMapper.toWorkUnit(responseSnake);
  }
  async delete(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(Snake);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }
  async getAll(): Promise<ISnake[]> {
    const repository = AppDataSource.getRepository(Snake);
    const responseSnakeArray = repository.find().then((boardsArray) => {
      return boardsArray.map((element) => {
        return snakeMapper.toWorkUnit(element);
      });
    });
    return responseSnakeArray;
  }
}
