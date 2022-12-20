import { injectable } from "inversify";
import GameDomain from "../../domain/entities/GameDomain";
import { DBDeletion } from "../../domain/types/types";
import { GameRepositoryInterface } from "../../domainRepository/GameRepositoryInterface";
import { AppDataSource } from "../DBConnection";
import { Game } from "./Game";
import { gameMapper } from "./gameMapper";

@injectable()
export class GameRepository implements GameRepositoryInterface {
  async save(game: GameDomain): Promise<GameDomain> {
    const repository = AppDataSource.getRepository(Game);
    const dbGame = gameMapper.toDBEntity(game);
    const responseBoard = await repository.save(dbGame);
    return gameMapper.toWorkUnit(responseBoard);
  }

  async findById(id: number): Promise<GameDomain | null> {
    const repository = AppDataSource.getRepository(Game);
    const responseGame = await repository.findOneBy({ id });
    return responseGame && gameMapper.toWorkUnit(responseGame);
  }

  async deleteById(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(Game);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }

  async findAll(): Promise<GameDomain[]> {
    const repository = AppDataSource.getRepository(Game);
    const responseGameArray = repository.find().then((boardsArray) => {
      return boardsArray.map((element) => {
        return gameMapper.toWorkUnit(element);
      });
    });
    return responseGameArray;
  }
}
