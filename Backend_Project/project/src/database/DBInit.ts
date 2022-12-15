import { AppDataSource } from "./DBConnection";

export class DBInit {
  async initializeDB(): Promise<void> {
    await AppDataSource.initialize();
  }
  async dropAndInitDB(): Promise<void> {
    await AppDataSource.dropDatabase();
    await AppDataSource.initialize();
  }
}
