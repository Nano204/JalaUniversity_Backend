import GameDomain from "../../../domain/entities/GameDomain";
import { GameState, Position, SpaceStatus } from "../../../domain/types/types";
import SnakeBehaviorService from "../../snake/behavior/SnakeBehaviorService";
import RandomNumberSupportService from "../../support/RandomNumberUnitOfWorkService";
import { GameBehaviorServiceInterface } from "./GameBehaviorInterface";

export default class GameBehaviorService implements GameBehaviorServiceInterface {
  private game: GameDomain;
  private gameTimer: NodeJS.Timer | undefined;

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
      while (coordinates && coordinates[snake.head.y][snake.head.x] !== "0") {
        const snakeService = new SnakeBehaviorService(snake);
        snakeService.setHeadPosition(boundary);
      }
      const { x, y } = snake.head;
      coordinates[y][x] = "H";
    });
  }

  clearBoard(): void {
    const coordinates = this.game.board?.coordinates;
    if (!coordinates) {
      throw new Error("Need board to be showed");
    }
    coordinates.map((array) => array.fill("0"));
  }

  locateFoodOnBoard(): void {
    const coordinates = this.game.board?.coordinates;
    if (!coordinates) {
      throw new Error("Need board to be filled");
    }
    const food = this.game.food;
    if (!food) {
      throw new Error("Need food to place on board");
    }
    while (coordinates && coordinates[food.position.y][food.position.x] !== "0") {
      food.position = this.newPosition();
    }
    coordinates[food.position.y][food.position.x] = "F";
  }

  newPosition(): Position {
    const randomNumber = new RandomNumberSupportService().randomNumber;
    if (!this.game.size) {
      throw new Error("Need size to assign Postions");
    }
    const boundary = this.game.size - 1;
    const newPosition = {
      x: randomNumber(boundary),
      y: randomNumber(boundary),
    };
    return newPosition;
  }

  getBoardScreen(): SpaceStatus[][] {
    if (!this.game.board) {
      throw new Error("Need board to be showed");
    }
    return this.game.board.coordinates;
  }

  initializeGame(): void {
    this.game.state = "Playing";
    this.gameTimer = setInterval(() => {
      this.game.snakes?.map((snake) => {
        if (!this.game.size) {
          throw new Error("Need size to set boundaries");
        }
        const boundary = this.game.size - 1;
        const snakeBehavior = new SnakeBehaviorService(snake);
        snakeBehavior.moveStep(boundary);
        this.clearBoard();
        this.locateSnakesonBoard();
        this.locateFoodOnBoard();
      });
      console.clear();
      console.log(this.getBoardScreen());
    }, 1000);
  }

  hasCrashed(): boolean {
    this.game.snakes?.map((snake) => {
      const snakeBehavior = new SnakeBehaviorService(snake);
      if (!this.game.size) {
        throw new Error("Need size to set boundaries");
      }
      const boundary = this.game.size - 1;
      snakeBehavior.moveStep(boundary);
      console.log(snake);
      snakeBehavior.growUp();
      snakeBehavior.moveStep(boundary);
      snakeBehavior.growUp();
      snakeBehavior.moveStep(boundary);
      snakeBehavior.growUp();
      snakeBehavior.moveStep(boundary);
      snakeBehavior.growUp();
      const nodes = snake.nodes;
      if (nodes) {
        console.log(snakeBehavior.getNodePostionArray(nodes));
      }
    });
    return false;
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
