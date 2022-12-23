import SnakeBehaviorService from "../appService/snake/behavior/SnakeBehaviorService";
import { SnakeServiceInterface } from "../appService/snake/SnakeServiceInterface";
import { UserServiceInterface } from "../appService/user/UserServiceInterface";
import { AppDataSource } from "../database/DBConnection";
import SERVICE_IDENTIFIER from "../dependencies/identifiers";
import container from "../dependencies/ioc_config";
import { SnakeDomain } from "../domain/entities/SnakeDomain";
import { Direction } from "../domain/types/types";

describe("Snake service testing", () => {
  const snakeService = container.get<SnakeServiceInterface>(
    SERVICE_IDENTIFIER.SNAKE_SERVICE
  );

  const userService = container.get<UserServiceInterface>(
    SERVICE_IDENTIFIER.USER_SERVICE
  );

  let snake: SnakeDomain;
  let snakeBehavior: SnakeBehaviorService;

  beforeAll(async () => {
    await AppDataSource.initialize();
    snake = await snakeService.createNew();
    await snakeService.createNew();
    await snakeService.createNew();
    snakeBehavior = new SnakeBehaviorService();
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it("Should return an SnakeDomain when create a new snake", async () => {
    snakeService.createNew().then((reponse) => {
      expect(reponse instanceof SnakeDomain).toBeTruthy();
    });
  });

  it("Should update an Snake in DB and return a SnakeDomain", async () => {
    const direction = Direction.down;
    snake.direction = direction;
    snakeService.updateSnake(snake).then((response) => {
      expect(response.direction).toEqual(direction);
      expect(response instanceof SnakeDomain).toBeTruthy();
    });
  });

  it("Should return an SnakeDomain when finding a snake", async () => {
    snakeService.findSnake(1).then((response) => {
      expect(response instanceof SnakeDomain).toBeTruthy();
    });
  });

  it("Should throw error if not finding a snake", () => {
    expect(snakeService.findSnake(4)).rejects.toThrowError();
  });

  it("Should return an User Id number when finding a Snake Owner Id", async () => {
    await userService.createNew("any", "player");
    await snakeBehavior.setOwner(1, 1);
    snakeService.findSnakeOwnerId(1).then((response) => {
      expect(response).toBeTruthy();
    });
  });

  it("Should return an Error when not finding a Snake Owner Id", async () => {
    expect(snakeService.findSnakeOwnerId(3)).rejects.toThrowError();
  });

  it("Should return an Error when not finding a Snake when searching Owner Id", async () => {
    expect(snakeService.findSnakeOwnerId(9)).rejects.toThrowError();
  });

  it("Should return Delete object type when delete a Snake", async () => {
    snakeService.deleteSnake(2).then((response) => {
      expect(response.affected).toBe(1);
    });
  });

  it("Should return and Array when find all Snakes", async () => {
    snakeService.findAllSnakes().then((response) => {
      expect(Array.isArray(response)).toBeTruthy();
    });
  });
});
