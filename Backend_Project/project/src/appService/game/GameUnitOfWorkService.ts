import IGame from "../../domain/entities/IGame";
import { IGameUnitOfWork } from "../../domainRepository/game/IGameUnitOfWork";

export default class GameUnitOfWorkService implements IGameUnitOfWork {
  create(speed = 1): IGame {
    const game = new IGame();
    game.speed = speed;
    game.state = "Ready";
    return game;
  }
}

//Setting game users
//Creating and saving board
// const boardContainer = container.get<IBoardRepository>(
//   SERVICE_IDENTIFIER.BOARD_SERVICE
// );
// const createdBoard = new BoardUnitOfWorkService().create(size);
// const savedBoard = await boardContainer.save(createdBoard);
// game.boardId = savedBoard.id;

//Creating and saving snakes
// const snakeContainer = container.get<ISnakeRepository>(
//   SERVICE_IDENTIFIER.SNAKE_SERVICE
// );
// const createdSnakes = users.map(() =>
//   new SnakeUnitOfWorkService().create(size)
// );
// const savedSnakes = await Promise.all(
//   createdSnakes.map((snake) => snakeContainer.save(snake))
// ).then((response) => response);
// game.snakes = savedSnakes.map((snake) => snake.id);

//Creating and saving food
// const foodContainer = container.get<IFoodRepository>(SERVICE_IDENTIFIER.FOOD_SERVICE);
// const createdFood = new FoodUnitOfWorkService().create();
// const savedFood = await foodContainer.save(createdFood);
// game.foodId = savedFood.id;
