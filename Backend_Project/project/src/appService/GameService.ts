import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../dependencies/constants/identifiers";
import { DBDeletion } from "../domain/types/types";
import IGame from "../domain/entities/IGame";
import { IGameRepository } from "../domainRepository/IGameRepository";

@injectable()
export default class GameService implements IGameRepository {
  private gameRepository: IGameRepository;

  constructor(
    @inject(SERVICE_IDENTIFIER.GAME_DB_REPOSITORY) gameRepository: IGameRepository
  ) {
    this.gameRepository = gameRepository;
  }
  async save(board: IGame): Promise<IGame> {
    return await this.gameRepository.save(board);
  }
  async find(id: number): Promise<IGame | null> {
    return await this.gameRepository.find(id);
  }
  async delete(id: number): Promise<DBDeletion> {
    return await this.gameRepository.delete(id);
  }
  async getAll(): Promise<IGame[]> {
    return await this.gameRepository.getAll();
  }
}
