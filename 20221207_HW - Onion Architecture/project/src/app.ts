import container from "./inversify/config/ioc_config";
import SERVICE_IDENTIFIER from "./inversify/constants/identifiers";
import { AppDataSource } from "./database/db/DBConnection";
import { jhon, julian, leonardo, sandra } from "./examples/people";
import { IUserRepository } from "./core/1_domainRepository/IUserRepository";

class Test_inversify {
  async initializeDB(): Promise<void> {
    await AppDataSource.initialize();
    const testUsers = container.get<IUserRepository>(SERVICE_IDENTIFIER.USER_REPOSITORY);

    console.log(await testUsers.addUser(jhon));
    console.log(await testUsers.addUser(julian));
    console.log(await testUsers.addUser(leonardo));
    console.log(await testUsers.addUser(sandra));

    console.log(await testUsers.findUser({ id: 1 }));
    console.log(await testUsers.findUser({ id: 2 }));

    console.log(await testUsers.deleteUser({ id: 4 }));
    await AppDataSource.dropDatabase();
  }
}

new Test_inversify().initializeDB();

// class Test1 {
//   async initializeDB() {
//     await AppDataSource.initialize();
//     const locationService = new LocationService();
//     console.log(await locationService.addLocation(earth));
//     console.log(await locationService.addLocation(abandago));
//     console.log(await locationService.addLocation(worldender));
//     console.log(await locationService.addLocation(anatomy));

//     console.log(await locationService.findLocation({ id: 1 }));
//     console.log(await locationService.findLocation({ id: 2 }));

//     console.log(await locationService.deleteLocation({ id: 4 }));
//     await AppDataSource.dropDatabase();
//   }
// }

// new Test1().initializeDB();
