import { AppDataSource } from "./DBConnection";

export class DBInit {
  async initializeDB(): Promise<void> {
    await AppDataSource.initialize();
    // await AppDataSource.dropDatabase();
  }
}
