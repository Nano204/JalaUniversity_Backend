import { ISnake } from "../domain/entities/ISnake";
import { ISnakeUnitOfWork } from "../domainRepository/ISnakeUnitOfWork";
import RandomNumberSupportService from "./RandomNumberUnitOfWorkService";

export default class SnakeUnitOfWorkService implements ISnakeUnitOfWork {
  createSnake(): ISnake {
    const snake = new ISnake();
    const randNum = new RandomNumberSupportService().randomNumber;
    snake.head = {
      x: randNum(10),
      y: randNum(10),
    };
    snake.nodes = [];
    return snake;
  }
}
