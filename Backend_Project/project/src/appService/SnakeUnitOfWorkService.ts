import { ISnake } from "../domain/entities/ISnake";
import { ISnakeUnitOfWork } from "../domainRepository/ISnakeUnitOfWork";
import RandomNumberSupportService from "./RandomNumberUnitOfWorkService";

export default class SnakeUnitOfWorkService implements ISnakeUnitOfWork {
  create(boundaryLimit: number): ISnake {
    const snake = new ISnake();
    snake.head = {
      x: new RandomNumberSupportService().randomNumber(boundaryLimit),
      y: new RandomNumberSupportService().randomNumber(boundaryLimit),
    };
    snake.nodes = [];
    return snake;
  }
}
