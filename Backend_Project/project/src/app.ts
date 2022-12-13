import container from "./dependencies/config/ioc_config";
import SERVICE_IDENTIFIER from "./dependencies/constants/identifiers";
import { AppDataSource } from "./database/DBConnection";
import { IUserRepository } from "./domainRepository/IUserRepository";
import { jhon, julian, leonardo, sandra } from "./examples/people";
import { IBoardRepository } from "./domainRepository/IBoardRepository";

class Test_inversify {
  async initializeDB(): Promise<void> {
    await AppDataSource.initialize();
    const testBoard = container.get<IBoardRepository>(
      SERVICE_IDENTIFIER.BOARD_SERVICE
    );

    console.log(await testBoard.createBoard(10));
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
