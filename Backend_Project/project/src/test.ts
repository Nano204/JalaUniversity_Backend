import container from "./dependencies/config/ioc_config";
import SERVICE_IDENTIFIER from "./dependencies/constants/identifiers";
import { AppDataSource } from "./database/DBConnection";
// import { IUserRepository } from "./domainRepository/IUserRepository";
// import { jhon, julian, leonardo, sandra } from "./examples/people";
import { IBoardRepository } from "./domainRepository/IBoardRepository";
import BoardUnitOfWorkService from "./appService/BoardUnitOfWorkService";
import SnakeUnitOfWorkService from "./appService/SnakeUnitOfWorkService";
import { ISnakeRepository } from "./domainRepository/ISnakeRepository";
import GameUnitOfWorkService from "./appService/GameUnitOfWorkService";
import FoodUnitOfWorkService from "./appService/FoodUnitOfWorkService";
import { IFoodRepository } from "./domainRepository/IFoodRepository";

class Test_inversify {
  async initializeDB(): Promise<void> {
    await AppDataSource.initialize();
    const createdGame = await new GameUnitOfWorkService().createGame(10, [12, 15]);
    console.log(createdGame);
    const createdBoard = new BoardUnitOfWorkService().create(4);
    const createdSnake = new SnakeUnitOfWorkService().create(10);
    const createdFood = new FoodUnitOfWorkService().create();
    const testBoardContainer = container.get<IBoardRepository>(
      SERVICE_IDENTIFIER.BOARD_SERVICE
    );
    const testSnakeContainer = container.get<ISnakeRepository>(
      SERVICE_IDENTIFIER.SNAKE_SERVICE
    );
    const testFoodContainer = container.get<IFoodRepository>(
      SERVICE_IDENTIFIER.FOOD_SERVICE
    );

    console.log(await testBoardContainer.save(createdBoard));
    console.log(await testSnakeContainer.save(createdSnake));
    console.log(await testFoodContainer.save(createdFood));
    await AppDataSource.dropDatabase();
  }
}

new Test_inversify().initializeDB();

// class Test_inversify {
//   async initializeDB(): Promise<void> {
//     await AppDataSource.initialize();
//     const testUsers = container.get<IUserRepository>(SERVICE_IDENTIFIER.USER_SERVICE);

//     console.log(await testUsers.addUser(jhon));
//     console.log(await testUsers.addUser(julian));
//     console.log(await testUsers.addUser(leonardo));
//     console.log(await testUsers.addUser(sandra));

//     console.log(await testUsers.findUser({ id: 1 }));
//     console.log(await testUsers.findUser({ id: 2 }));

//     console.log(await testUsers.deleteUser({ id: 4 }));
//     await AppDataSource.dropDatabase();
//   }
// }

// new Test_inversify().initializeDB();
