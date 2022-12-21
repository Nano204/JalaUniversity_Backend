import { AppDataSource } from "./database/DBConnection";

class clean_Database {
  async initializeDB(): Promise<void> {
    await AppDataSource.initialize();
    AppDataSource.dropDatabase();
  }
}

new clean_Database().initializeDB();
