import { inject, injectable } from "inversify";
import SERVICE_IDENTIFIER from "../../dependencies/identifiers";
import { DBDeletion } from "../../domain/types/types";
import { GameServiceInterface } from "./GameServiceInterface";
import { GameRepositoryInterface } from "../../domainRepository/GameRepositoryInterface";
import GameDomain from "../../domain/entities/GameDomain";

@injectable()
export default class GameService implements GameServiceInterface {
  private gameRepository: GameRepositoryInterface;

  constructor(
    @inject(SERVICE_IDENTIFIER.GAME_DB_REPOSITORY)
      gameRepository: GameRepositoryInterface
  ) {
    this.gameRepository = gameRepository;
  }
  async createNew(): Promise<GameDomain> {
    const game = new GameDomain();    
    return await this.gameRepository.save(game);
  }

  async updateGame(game: GameDomain): Promise<GameDomain> {
    return await this.gameRepository.save(game);
  }

  async findGame(id: number): Promise<GameDomain> {
    return await this.gameRepository.findById(id);
  }

  async deleteGame(id: number): Promise<DBDeletion> {
    return await this.gameRepository.deleteById(id);
  }

  async findAllGame(): Promise<GameDomain[]> {
    return await this.gameRepository.findAll();
  }
}
