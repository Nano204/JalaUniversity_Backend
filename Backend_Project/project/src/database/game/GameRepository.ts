import { injectable } from "inversify";
import GameDomain from "../../domain/entities/GameDomain";
import { DBDeletion } from "../../domain/types/types";
import { GameRepositoryInterface } from "../../domainRepository/GameRepositoryInterface";
import { AppDataSource } from "../DBConnection";
import IdSetterRepository from "../idBuilder/IdSetterRepository";
import { Game } from "./Game";
import { gameMapper } from "./gameMapper";

@injectable()
export class GameRepository implements GameRepositoryInterface {
  async save(game: GameDomain): Promise<GameDomain> {
    const repository = AppDataSource.getMongoRepository(Game);
    if (!game.id) {
      game.id = await new IdSetterRepository().getNewId("Game");
      const dbGame = gameMapper.toDBEntity(game);
      const savedGame = await repository.save(dbGame);
      return gameMapper.toWorkUnit(savedGame);
    }
    const dbGame = gameMapper.toDBEntity(game);
    await repository.update({ id: game.id }, dbGame);
    return gameMapper.toWorkUnit(dbGame);
  }

  async findById(id: number): Promise<GameDomain> {
    const repository = AppDataSource.getRepository(Game);
    const responseGame = await repository.findOne({
      where: { id },
    });
    if (!responseGame) {
      throw new Error("Not found");
    }
    return gameMapper.toWorkUnit(responseGame);
  }

  async deleteById(id: number): Promise<DBDeletion> {
    const repository = AppDataSource.getRepository(Game);
    const deleted = await repository.delete({ id });
    return { affected: deleted.affected };
  }

  async findAll(): Promise<GameDomain[]> {
    const repository = AppDataSource.getRepository(Game);
    const responsePromiseArray = await repository.find();
    const responseGameArray = await Promise.all(
      responsePromiseArray.map((element) => {
        return gameMapper.toWorkUnit(element);
      })
    );
    return responseGameArray;
  }
}
