import { injectable } from "inversify";
import IGame from "../../domain/entities/IGame";
import { DBDeletion } from "../../domain/types/types";
import { IGameRepository } from "../../domainRepository/game/IGameRepository";
import { AppDataSource } from "../DBConnection";
import { User } from "../user/User";
import { Game } from "./Game";
import { gameMapper } from "./gameMapper";

@injectable()
export class GameRepository implements IGameRepository {
  async add(game: IGame, usersIdArray: number[]): Promise<IGame> {
    //Set usefull repositories
    const gameRepository = AppDataSource.getRepository(Game);
    const userRepository = AppDataSource.getRepository(User);
    //Prepare game as entity
    const dbGame = gameMapper.toDBEntity(game);
    //Search for users entities
    const usersArray = await Promise.all(
      usersIdArray.map((id) =>
        userRepository.findOne({
          where: { id },
        })
      )
    );
    //Set users on the game
    if (usersArray.includes(null)) throw new Error("Usuario no encontrado");
    dbGame.users = usersArray as User[];
    const createdGame = gameRepository.create(dbGame);
    console.log(createdGame);
    const responseGame = await gameRepository.save(createdGame);
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
