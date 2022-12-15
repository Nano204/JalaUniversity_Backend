import { ISnake } from "../../domain/entities/ISnake";
import { ISnakeUnitOfWork } from "../../domainRepository/snake/ISnakeUnitOfWork";
import RandomNumberSupportService from "../support/RandomNumberUnitOfWorkService";

export default class SnakeUnitOfWorkService implements ISnakeUnitOfWork {
  create(boundaryLimit: number): ISnake {
    const snake = new ISnake();
    const randomNumber = new RandomNumberSupportService().randomNumber;
    snake.head = {
      x: randomNumber(boundaryLimit),
      y: randomNumber(boundaryLimit),
    };
    snake.nodes = [];
    snake.direction = randomNumber(3);
    return snake;
  }
}
