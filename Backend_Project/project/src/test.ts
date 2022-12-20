import GameBehaviorService from "./appService/game/behavior/GameBehaviorService";
import GameBuilder from "./appService/game/builder/GameBuilderService";
import Game from "./appService/game/builder/GameBuilderService";
import { GameServiceInterface } from "./appService/game/GameServiceInterface";
import SnakeBehaviorService from "./appService/snake/behavior/SnakeBehaviorService";
import { SnakeServiceInterface } from "./appService/snake/SnakeServiceInterface";
import { UserServiceInterface } from "./appService/user/UserServiceInterface";
import { AppDataSource } from "./database/DBConnection";
import SERVICE_IDENTIFIER from "./dependencies/identifiers";
import container from "./dependencies/ioc_config";
import GameDomain from "./domain/entities/GameDomain";
import { Direction } from "./domain/types/types";
import { UserRepositoryInterface } from "./domainRepository/UserRepositoryInterface";

class Test_inversify {
  async initializeDB(): Promise<void> {
    await AppDataSource.initialize();
    try {
      const userService = container.get<UserServiceInterface>(
        SERVICE_IDENTIFIER.USER_SERVICE
      );

      const gameService = container.get<GameServiceInterface>(
        SERVICE_IDENTIFIER.GAME_SERVICE
      );
      const player1 = await userService.createNew("Player", "01");
      const player2 = await userService.createNew("Player", "02");

      const game = new GameDomain();
      const gameBuilder = new GameBuilder(game);
      console.log("Here");
      const gameBehavior = new GameBehaviorService(game);
      console.log(game);
      gameBuilder.setSize(10);
      await gameBuilder.setBoard();
      gameBuilder.setUsers([player1, player2]);
      await gameBuilder.setSnakes();
      gameBehavior.locateSnakesonBoard();
      await gameBehavior.createNewFood();
      gameBehavior.locateFoodOnBoard();
      console.log(gameBehavior.getBoardScreen());
      console.log(game);
      AppDataSource.dropDatabase();
    } catch (error) {
      console.log(error);
      AppDataSource.dropDatabase();
    }
    //Creating users testing

    // const snakeBehaviorService = new SnakeBehaviorService();

    // const snakeService = container.get<SnakeServiceInterface>(
    //   SERVICE_IDENTIFIER.SNAKE_SERVICE
    // );

    // const snake1 = await snakeService.createNew();
    // const snake = await snakeService.createNew();
    // console.log({ snake });
    // console.log({ snake1 });
    // snakeBehaviorService.setHeadPosition(snake, 9);
    // snakeBehaviorService.changeDirection(snake, Direction.Left);
    // snakeBehaviorService.moveStep(snake, 9);
    // snakeBehaviorService.changeDirection(snake, Direction.Up);
    // snakeBehaviorService.moveStep(snake, 9);
    // snakeBehaviorService.moveStep(snake, 9);
    // snakeBehaviorService.moveStep(snake, 9);
    // snakeBehaviorService.changeDirection(snake, Direction.Down);
    // snakeBehaviorService.moveStep(snake, 9);
    // snakeBehaviorService.moveStep(snake, 9);
    // snakeBehaviorService.growUp(snake);
    // snakeBehaviorService.moveStep(snake, 9);
    // snakeBehaviorService.moveStep(snake, 9);
    // snakeBehaviorService.growUp(snake);
    // snakeBehaviorService.moveStep(snake, 9);
    // snakeBehaviorService.moveStep(snake, 9);
    // snakeBehaviorService.growUp(snake);
    // snakeBehaviorService.moveStep(snake, 9);
    // snakeBehaviorService.killSnake(snake);
    // console.log("snake db 1", await snakeService.updateSnake(snake1));
    // console.log("snake db 0", await snakeService.updateSnake(snake));
    // await AppDataSource.dropDatabase();
    //     ////Creating users testing
    //     const player1 = new UserUnitOfWorkService().create("Nano", "Gomez");
    //     const player2 = new UserUnitOfWorkService().create("Other", "Person");
    //     const userRep = container.get<UserRepositoryInterface>(
    //       SERVICE_IDENTIFIER.USER_DB_REPOSITORY
    //     );
    //     console.log(await userRep.save(player1));
    //     console.log(await userRep.save(player2));

    //     ////Creating game testing
    //     const game = new GameUnitOfWorkService().create();
    //     console.log(game);

    //     ////Connect user with game in database
    //     const gameRep = container.get<GameRepositoryInterface>(
    //       SERVICE_IDENTIFIER.GAME_DB_REPOSITORY
    //     );
    //     console.log(await gameRep.build(game, [1, 2]));

    //     // console.log(await testBoardContainer.save(createdBoard));

    //     // console.log(createdGame);
    //     // const createdBoard = new BoardUnitOfWorkService().create(4);
    //     // const createdSnake = new SnakeUnitOfWorkService().create(10,10);
    //     // const createdFood = new FoodUnitOfWorkService().create();
    //     //
    //     // const testFoodContainer = container.get<IFoodRepository>(
    //     //   SERVICE_IDENTIFIER.FOOD_SERVICE
    //     // );

    //     // console.log(await testFoodContainer.save(createdFood));
  }
}

new Test_inversify().initializeDB();
