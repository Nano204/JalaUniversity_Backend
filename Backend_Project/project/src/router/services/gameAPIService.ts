import GameUnitOfWorkService from "../../appService/game/GameUnitOfWorkService";
import container from "../../dependencies/config/ioc_config";
import SERVICE_IDENTIFIER from "../../dependencies/constants/identifiers";
import { IGameRepository } from "../../domainRepository/game/IGameRepository";

export default class GameAPIService {
  async createGame(users: number[], size: number, speed: number) {
    const gameContainer = container.get<IGameRepository>(SERVICE_IDENTIFIER.GAME_SERVICE);
    const createdGame = await new GameUnitOfWorkService().createGame(users, speed, size);
    return await gameContainer.save(createdGame);
  }
}
