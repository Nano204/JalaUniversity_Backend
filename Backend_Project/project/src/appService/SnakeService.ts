import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../dependencies/constants/identifiers";
import { ISnake } from "../domain/entities/ISnake";
import { DBDeletion } from "../domain/types/types";
import { ISnakeRepository } from "../domainRepository/ISnakeRepository";

@injectable()
export default class SnakeService implements ISnakeRepository {
  private snakeRepository: ISnakeRepository;

  constructor(
    @inject(SERVICE_IDENTIFIER.SNAKE_DB_REPOSITORY) snakeRepository: ISnakeRepository
  ) {
    this.snakeRepository = snakeRepository;
  }
  async createSnake(snake: ISnake): Promise<ISnake> {
    return await this.snakeRepository.createSnake(snake);
  }
  async findSnake(id: number): Promise<ISnake | null> {
    return await this.snakeRepository.findSnake(id);
  }
  async deleteSnake(id: number): Promise<DBDeletion> {
    return await this.snakeRepository.deleteSnake(id);
  }
  async getAllSnakes(): Promise<ISnake[]> {
    return await this.snakeRepository.getAllSnakes();
  }
}
