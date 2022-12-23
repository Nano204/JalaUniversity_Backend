import { GameServiceInterface } from "../appService/game/GameServiceInterface";
import { AppDataSource } from "../database/DBConnection";
import SERVICE_IDENTIFIER from "../dependencies/identifiers";
import container from "../dependencies/ioc_config";
import GameDomain from "../domain/entities/GameDomain";

describe("Game service testing", () => {
  const gameService = container.get<GameServiceInterface>(
    SERVICE_IDENTIFIER.GAME_SERVICE
  );

  let game;

  beforeAll(async () => {
    await AppDataSource.initialize();
    await gameService.createNew();
    await gameService.createNew();
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it("Should return an GameDomain when create a new game", async () => {
    gameService.createNew().then((reponse) => {
      expect(reponse instanceof GameDomain).toBeTruthy();
    });
  });

  it("Should update an Game in DB and return a GameDomain", async () => {
    game = await gameService.createNew();
    const speed = 3000;
    game.interval = 3000;
    gameService.updateGame(game).then((response) => {
      expect(response.interval).toEqual(speed);
      expect(response instanceof GameDomain).toBeTruthy();
    });
  });

  it("Should return an GameDomain when finding a Game", async () => {
    gameService.findGame(1).then((response) => {
      expect(response instanceof GameDomain).toBeTruthy();
    });
  });

  it("Should throw error if not finding a game", () => {
    expect(gameService.findGame(5)).rejects.toThrowError();
  });

  it("Should return Delete object type when delete a Snake", async () => {
    gameService.deleteGame(2).then((response) => {
      expect(response.affected).toBe(1);
    });
  });

  it("Should return and Array when find all Snakes", async () => {
    gameService.findAllGames().then((response) => {
      expect(Array.isArray(response)).toBeTruthy();
    });
  });
});
