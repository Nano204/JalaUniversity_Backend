import SERVICE_IDENTIFIER from "../../../dependencies/identifiers";
import container from "../../../dependencies/ioc_config";
import GameDomain from "../../../domain/entities/GameDomain";
import { GameState, SpaceStatus } from "../../../domain/types/types";
import { FoodServiceInterface } from "../../food/FoodServiceInterface";
import SnakeBehaviorService from "../../snake/behavior/SnakeBehaviorService";
import { GameBehaviorServiceInterface } from "./GameBehaviorInterface";

export default class GameBehaviorService implements GameBehaviorServiceInterface {
  private game: GameDomain;

  private foodService = container.get<FoodServiceInterface>(
    SERVICE_IDENTIFIER.FOOD_SERVICE
  );

  constructor(game: GameDomain) {
    this.game = game;
    this.game.speed = 1;
    this.game.state = "Ready" as GameState;
  }

  locateSnakesonBoard(): void {
    const coordinates = this.game.board?.coordinates;
    if (!this.game.size) {
      throw new Error("Need size to assign Snakes");
    }
    if (!coordinates) {
      throw new Error("Need board to be filled");
    }
    const boundary = this.game.size - 1;
    this.game.snakes?.map((snake) => {
      do {
        const snakeService = new SnakeBehaviorService(snake);
        snakeService.setHeadPosition(boundary);
      } while (coordinates && coordinates[snake.head.x][snake.head.y] !== "0");
      coordinates[snake.head.x][snake.head.y] = "H";
    });
  }

  async createNewFood(): Promise<void> {
    if (!this.game.size) {
      throw new Error("Need size to assign Food");
    }
    const boundary = this.game.size - 1;
    const food = await this.foodService.createNew(boundary);
    this.game.food = food;
  }

  locateFoodOnBoard(): void {
    const coordinates = this.game.board?.coordinates;
    const food = this.game.food;
    if (!coordinates) {
      throw new Error("Need board to be filled");
    }
    if (!food) {
      throw new Error("Need food to place on board");
    }
    while (coordinates && coordinates[food.position.x][food.position.y] !== "0") {
      this.createNewFood();
    }
    coordinates[food.position.x][food.position.y] = "F";
  }

  getBoardScreen(): SpaceStatus[][] {
    if (!this.game.board) {
      throw new Error("Need board to be showed");
    }
    return this.game.board.coordinates;
  }

  initializeGame(): void {
    throw new Error("Method not implemented.");
  }

  restartGame(): void {
    throw new Error("Method not implemented.");
  }

  getBoard(): SpaceStatus[][] {
    throw new Error("Method not implemented.");
  }

  endGame(): void {
    throw new Error("Method not implemented.");
  }
}
