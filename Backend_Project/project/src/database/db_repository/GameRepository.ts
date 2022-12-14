import { injectable } from "inversify";
import IGame from "../../domain/entities/IGame";
import { DBDeletion } from "../../domain/types/types";
import { IGameRepository } from "../../domainRepository/IGameRepository";
import { AppDataSource } from "../DBConnection";
import { Game } from "../db_entities/Game";
import { gameMapper } from "../db_mappers/gameMapper";

@injectable()
export class GameRepository implements IGameRepository {
  async save(game: IGame): Promise<IGame> {
    const repository = AppDataSource.getRepository(Game);
    const dbGame = gameMapper.toDBEntity(game);
    const responseGame = await repository.save(dbGame);
    return gameMapper.toWorkUnit(responseGame);
  }
  async find(id: number): Promise<IGame | null> {
    const repository = AppDataSource.getRepository(Game);
    const responseGame = await repository.findOneBy({ id });
    return responseGame && gameMapper.toWorkUnit(responseGame);
  }

  async delete(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(Game);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }

  async getAll(): Promise<IGame[]> {
    const repository = AppDataSource.getRepository(Game);
    const responseGameArray = repository.find().then((boardsArray) => {
      return boardsArray.map((element) => {
        return gameMapper.toWorkUnit(element);
      });
    });
    return responseGameArray;
  }
}
