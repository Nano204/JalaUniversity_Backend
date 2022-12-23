import SnakeBehaviorService from "../appService/snake/behavior/SnakeBehaviorService";
import { SnakeServiceInterface } from "../appService/snake/SnakeServiceInterface";
import { UserServiceInterface } from "../appService/user/UserServiceInterface";
import { AppDataSource } from "../database/DBConnection";
import SERVICE_IDENTIFIER from "../dependencies/identifiers";
import container from "../dependencies/ioc_config";
import { SnakeDomain } from "../domain/entities/SnakeDomain";
import { Direction } from "../domain/types/types";

describe("Snake behavior testing", () => {
  const snakeBehaviorService = new SnakeBehaviorService();
  const snakeService = container.get<SnakeServiceInterface>(
    SERVICE_IDENTIFIER.SNAKE_SERVICE
  );

  beforeAll(async () => {
    await AppDataSource.initialize();
    const userService = container.get<UserServiceInterface>(
      SERVICE_IDENTIFIER.USER_SERVICE
    );
    await userService.createNew("Player", "Example");
  });

  afterAll(async () => {
    await AppDataSource.dropDatabase();
    await AppDataSource.destroy();
  });

  it("Should build a new snake if given an Owner Id and a Boundary", async () => {
    const snake = await snakeBehaviorService.buildNewSnake(1, 9);
    expect(snake instanceof SnakeDomain).toBeTruthy();
  });

  it("Should throw an error when building a snake if an inexistent Owner Id", async () => {
    const snake = async () => {
      await snakeBehaviorService.buildNewSnake(0, 9);
    };
    expect(snake).rejects.toThrowError();
  });

  it("Should return the apropiated direction", () => {
    const directionMapper = snakeBehaviorService.directionMapper;
    expect(directionMapper("up")).toBe(Direction.up);
    expect(directionMapper("left")).toBe(Direction.left);
    expect(directionMapper("right")).toBe(Direction.right);
    expect(directionMapper("down")).toBe(Direction.down);
  });

  it("Should return the contrary direction", () => {
    const contraryDirection = snakeBehaviorService.contraryDirection;
    expect(contraryDirection(Direction.down)).toBe(Direction.up);
    expect(contraryDirection(Direction.right)).toBe(Direction.left);
    expect(contraryDirection(Direction.left)).toBe(Direction.right);
    expect(contraryDirection(Direction.up)).toBe(Direction.down);
  });

  it("Should make snake move", async () => {
    const boundary = 10;
    let snakeFirst = await snakeService.createNew();
    snakeFirst = await snakeBehaviorService.restartSnake(snakeFirst.id, boundary);
    const snakeLast = await snakeBehaviorService.moveStep(snakeFirst.id, boundary);
    const comparePositions = snakeBehaviorService.comparePositions(
      snakeFirst.head,
      snakeLast.head
    );
    expect(comparePositions).toBeFalsy();
  });

  it("Should change direction if finding it's first node when moving move", async () => {
    const boundary = 10;
    let snake = await snakeService.createNew();
    snake = await snakeBehaviorService.restartSnake(snake.id, boundary);
    const { head } = snake;
    const position = { ...head };
    snake.nodes = [{ x: position.x, y: position.y + 1 }];
    snake.direction = Direction.up;
    snake = await snakeService.updateSnake(snake);
    snake = await snakeBehaviorService.moveStep(snake.id, boundary);
    expect(snake.direction).toBe(Direction.down);
  });
});
