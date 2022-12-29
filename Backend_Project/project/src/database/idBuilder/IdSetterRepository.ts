import { AppDataSource } from "../DBConnection"; // Revisar
import { IdSetter } from "./IdSetter";

type DBEntity = "User" | "Board" | "Snake" | "Food" | "Game";

export default class IdSetterRepository {
  async getNewId(entity: DBEntity): Promise<number> {
    const repository = AppDataSource.getRepository(IdSetter);
    const idSetter = (await repository.find())[0];
    if (!idSetter) {
      const newIdSetter = repository.create();
      newIdSetter.lastGameId = 0;
      newIdSetter.lastSnakeId = 0;
      newIdSetter.lastBoardId = 0;
      newIdSetter.lastUserId = 0;
      newIdSetter.lastFoodId = 0;
      newIdSetter[`last${entity}Id`] = 1;
      repository.save(newIdSetter);
      return newIdSetter[`last${entity}Id`];
    }
    ++idSetter[`last${entity}Id`];
    repository.save(idSetter);
    return idSetter[`last${entity}Id`];
  }
}
