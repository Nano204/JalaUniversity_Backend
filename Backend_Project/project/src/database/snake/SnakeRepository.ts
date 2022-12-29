import { injectable } from "inversify";
import { SnakeDomain } from "../../domain/entities/SnakeDomain";
import { DBDeletion } from "../../domain/types/types";
import { SnakeRepositoryInterface } from "../../domainRepository/SnakeRepositoryInterface";
import { AppDataSource } from "../DBConnection";
import IdSetterRepository from "../idBuilder/IdSetterRepository";
import { Snake } from "./Snake";
import { snakeMapper } from "./snakeMapper";

@injectable()
export class SnakeRepository implements SnakeRepositoryInterface {
  async save(snake: SnakeDomain): Promise<SnakeDomain> {
    const repository = AppDataSource.getMongoRepository(Snake);
    if (!snake.id) {
      snake.id = await new IdSetterRepository().getNewId("Snake");
      const dbSnake = snakeMapper.toDBEntity(snake);
      const savedSnake = await repository.save(dbSnake);
      return snakeMapper.toWorkUnit(savedSnake);
    }
    const dbSnake = snakeMapper.toDBEntity(snake);
    await repository.update({ id: snake.id }, dbSnake);
    return snakeMapper.toWorkUnit(dbSnake);
  }

  async findById(id: number): Promise<SnakeDomain> {
    const repository = AppDataSource.getRepository(Snake);
    const responseSnake = await repository.findOneBy({ id });
    if (!responseSnake) {
      throw new Error("Not found");
    }
    return snakeMapper.toWorkUnit(responseSnake);
  }

  async findByIdWithRelations(id: number): Promise<SnakeDomain> {
    const repository = AppDataSource.getRepository(Snake);
    const findedSnake = await repository.findOne({
      where: { id },
      relations: ["user", "game"],
    });
    if (!findedSnake) {
      throw new Error("Not found");
    }
    return snakeMapper.toWorkUnit(findedSnake);
  }

  async deleteById(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(Snake);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }

  async findAll(): Promise<SnakeDomain[]> {
    const repository = AppDataSource.getRepository(Snake);
    const responsePromiseArray = await repository.find();
    const responseSnakeArray = await Promise.all(
      responsePromiseArray.map((element) => {
        return snakeMapper.toWorkUnit(element);
      })
    );
    return responseSnakeArray;
  }
}
