import { injectable } from "inversify";
import { SnakeDomain } from "../../domain/entities/SnakeDomain";
import { DBDeletion } from "../../domain/types/types";
import { SnakeRepositoryInterface } from "../../domainRepository/SnakeRepositoryInterface";
import { AppDataSource } from "../DBConnection";
import { Snake } from "./Snake";
import { snakeMapper } from "./snakeMapper";

@injectable()
export class SnakeRepository implements SnakeRepositoryInterface {
  async save(snake: SnakeDomain): Promise<SnakeDomain> {
    const repository = AppDataSource.getRepository(Snake);
    const dbSnake = snakeMapper.toDBEntity(snake);
    let responseSnake;
    if (snake.id) {
      responseSnake = await repository.save({ ...dbSnake, id: snake.id });
    } else {
      responseSnake = await repository.save(dbSnake);
    }
    return snakeMapper.toWorkUnit(responseSnake);
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
    const responseSnakeArray = repository.find().then((boardsArray) => {
      return boardsArray.map((element) => {
        return snakeMapper.toWorkUnit(element);
      });
    });
    return responseSnakeArray;
  }
}
