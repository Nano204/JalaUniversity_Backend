import { AppDataSource } from "./DBSource";

export class DBInit {
    async initializeDB(): Promise<void> {
        await AppDataSource.initialize();
    }
}
