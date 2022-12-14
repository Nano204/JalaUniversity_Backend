import container from "../dependencies/config/ioc_config";
import SERVICE_IDENTIFIER from "../dependencies/constants/identifiers";
import IGame from "../domain/entities/IGame";
import { IBoardRepository } from "../domainRepository/IBoardRepository";
import { IFoodRepository } from "../domainRepository/IFoodRepository";
import { IGameUnitOfWork } from "../domainRepository/IGameUnitOfWork";
import { ISnakeRepository } from "../domainRepository/ISnakeRepository";
import BoardUnitOfWorkService from "./BoardUnitOfWorkService";
import FoodUnitOfWorkService from "./FoodUnitOfWorkService";
import SnakeUnitOfWorkService from "./SnakeUnitOfWorkService";

export default class GameUnitOfWorkService implements IGameUnitOfWork {
  async createGame(size: number, users: number[]): Promise<IGame> {
    const game = new IGame();
    //Setting game users
    game.users = users;
    //Creating and saving board
    const boardContainer = container.get<IBoardRepository>(
      SERVICE_IDENTIFIER.BOARD_SERVICE
    );
    const createdBoard = new BoardUnitOfWorkService().create(size);
    const savedBoard = await boardContainer.save(createdBoard);
    game.boardId = savedBoard.id;

    //Creating and saving snakes
    const snakeContainer = container.get<ISnakeRepository>(
      SERVICE_IDENTIFIER.SNAKE_SERVICE
    );
    const createdSnakes = users.map(() => new SnakeUnitOfWorkService().create(size));
    const savedSnakes = await Promise.all(
      createdSnakes.map((snake) => snakeContainer.save(snake))
    ).then((response) => response);
    game.snakes = savedSnakes.map((snake) => snake.id);

    //Creating and saving food
    const foodContainer = container.get<IFoodRepository>(SERVICE_IDENTIFIER.FOOD_SERVICE);
    const createdFood = new FoodUnitOfWorkService().create();
    const savedFood = await foodContainer.save(createdFood);
    game.foodId = savedFood.id;
    return game;
  }
}
