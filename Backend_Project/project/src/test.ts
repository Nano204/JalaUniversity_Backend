import GameUnitOfWorkService from "./appService/game/GameUnitOfWorkService";
import UserUnitOfWorkService from "./appService/user/UserUnitOfWorkService";
import { AppDataSource } from "./database/DBConnection";
import container from "./dependencies/config/ioc_config";
import SERVICE_IDENTIFIER from "./dependencies/constants/identifiers";
import { IGameRepository } from "./domainRepository/game/IGameRepository";
import { IUserRepository } from "./domainRepository/user/IUserRepository";

class Test_inversify {
  async initializeDB(): Promise<void> {
    await AppDataSource.initialize();

    ////Creating users testing
    const player1 = new UserUnitOfWorkService().create("Nano", "Gomez");
    const player2 = new UserUnitOfWorkService().create("Other", "Person");
    const userRep = container.get<IUserRepository>(SERVICE_IDENTIFIER.USER_DB_REPOSITORY);
    console.log(await userRep.add(player1));
    console.log(await userRep.add(player2));

    ////Creating game testing
    const game = new GameUnitOfWorkService().create();
    console.log(game);

    ////Connect user with game in database
    const gameRep = container.get<IGameRepository>(SERVICE_IDENTIFIER.GAME_DB_REPOSITORY);
    console.log(await gameRep.add(game, [1, 2]));

    // console.log(await testBoardContainer.save(createdBoard));
    // const testSnakeContainer = container.get<ISnakeRepository>(
    // console.log(createdGame);
    // const createdBoard = new BoardUnitOfWorkService().create(4);
    // const createdSnake = new SnakeUnitOfWorkService().create(10,10);
    // const createdFood = new FoodUnitOfWorkService().create();
    //   SERVICE_IDENTIFIER.SNAKE_SERVICE
    // );
    // const testFoodContainer = container.get<IFoodRepository>(
    //   SERVICE_IDENTIFIER.FOOD_SERVICE
    // );

    // console.log(await testFoodContainer.save(createdFood));
    // await AppDataSource.dropDatabase();
  }
}

new Test_inversify().initializeDB();
