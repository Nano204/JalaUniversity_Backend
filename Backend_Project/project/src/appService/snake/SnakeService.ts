import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../../dependencies/identifiers";
import { SnakeDomain } from "../../domain/entities/SnakeDomain";
import { DBDeletion } from "../../domain/types/types";
import { SnakeRepositoryInterface } from "../../domainRepository/SnakeRepositoryInterface";
import { SnakeServiceInterface } from "./SnakeServiceInterface";
import RandomNumberSupportService from "../support/RandomNumberUnitOfWorkService";

const randomNumber = new RandomNumberSupportService().randomNumber;
@injectable()
export default class SnakeService implements SnakeServiceInterface {
  private snakeRepository: SnakeRepositoryInterface;

  constructor(
    @inject(SERVICE_IDENTIFIER.SNAKE_DB_REPOSITORY)
      snakeRepository: SnakeRepositoryInterface
  ) {
    this.snakeRepository = snakeRepository;
  }

  async createNew(): Promise<SnakeDomain> {
    const snake = new SnakeDomain();
    const maxDirectionIndex = 3;
    snake.direction = randomNumber(maxDirectionIndex);
    snake.status = "Alive";
    snake.length = 1;
    snake.nodes = [];
    return await this.snakeRepository.save(snake);
  }

  async updateSnake(snake: SnakeDomain): Promise<SnakeDomain> {
    return await this.snakeRepository.save(snake);
  }

  async findSnake(id: number): Promise<SnakeDomain> {
    return await this.snakeRepository.findById(id);
  }

  async deleteSnake(id: number): Promise<DBDeletion> {
    return await this.snakeRepository.deleteById(id);
  }

  async findAllSnakes(): Promise<SnakeDomain[]> {
    return await this.snakeRepository.findAll();
  }
}
