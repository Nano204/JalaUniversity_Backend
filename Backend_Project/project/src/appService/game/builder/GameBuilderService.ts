import SERVICE_IDENTIFIER from "../../../dependencies/identifiers";
import container from "../../../dependencies/ioc_config";
import GameDomain from "../../../domain/entities/GameDomain";
import { UserDomain } from "../../../domain/entities/UserDomain";
import { GameState } from "../../../domain/types/types";
import { BoardServiceInterface } from "../../board/BoardServiceInterface";
import { FoodServiceInterface } from "../../food/FoodServiceInterface";
import SnakeBehaviorService from "../../snake/behavior/SnakeBehaviorService";
import { SnakeServiceInterface } from "../../snake/SnakeServiceInterface";
import { GameBuilderInterface } from "./GameBuilderServiceInterface";

export default class GameBuilder implements GameBuilderInterface {
  private game: GameDomain;

  private baordService = container.get<BoardServiceInterface>(
    SERVICE_IDENTIFIER.BOARD_SERVICE
  );

  private snakeService = container.get<SnakeServiceInterface>(
    SERVICE_IDENTIFIER.SNAKE_SERVICE
  );

  private foodService = container.get<FoodServiceInterface>(
    SERVICE_IDENTIFIER.FOOD_SERVICE
  );

  constructor(game: GameDomain) {
    this.game = game;
    this.game.speed = 1;
    this.game.state = "Ready" as GameState;
  }

  setSpeed(speed: number): void {
    this.game.speed = speed;
  }

  setUsers(users: UserDomain[]): void {
    this.game.users = users;
  }

  setSize(size: number) {
    this.game.size = size;
  }

  async setBoard(): Promise<void> {
    if (!this.game.size) {
      throw new Error("Need size to assign Board");
    }
    const board = await this.baordService.createNew(this.game.size);
    this.game.board = board;
  }

  async setSnakes(): Promise<void> {
    if (!this.game.users?.length) {
      throw new Error("Need users to assing Snakes");
    }

    const snakes = await Promise.all(
      this.game.users.map(async (user) => {
        const snake = await this.snakeService.createNew();
        const snakeBehavior = new SnakeBehaviorService(snake);
        snakeBehavior.setOwner(user.id);
        if (!this.game.size) {
          throw new Error("Need size to set snakes");
        }
        snakeBehavior.setHeadPosition(this.game.size);
        return snake;
      })
    );
    this.game.snakes = snakes;
  }

  async setFood(): Promise<void> {
    if (!this.game.size) {
      throw new Error("Need size to assign Food");
    }
    const boundary = this.game.size - 1;
    const food = await this.foodService.createNew(boundary);
    this.game.food = food;
  }
}
