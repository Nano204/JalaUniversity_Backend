import SERVICE_IDENTIFIER from "../../../dependencies/identifiers";
import container from "../../../dependencies/ioc_config";
import GameDomain from "../../../domain/entities/GameDomain";
import { SnakeDomain } from "../../../domain/entities/SnakeDomain";
import { Position } from "../../../domain/types/types";
import { BoardServiceInterface } from "../../board/BoardServiceInterface";
import { FoodServiceInterface } from "../../food/FoodServiceInterface";
import SnakeBehaviorService from "../../snake/behavior/SnakeBehaviorService";
import RandomNumberSupportService from "../../support/RandomNumberUnitOfWorkService";
import { GameServiceInterface } from "../GameServiceInterface";
import { GameBehaviorServiceInterface } from "./GameBehaviorInterface";

export default class GameBehaviorService implements GameBehaviorServiceInterface {
  private game;
  private boundary;
  private interval: NodeJS.Timer | undefined;
  private snakeBehaviorService = new SnakeBehaviorService();

  private randomNumber = new RandomNumberSupportService().randomNumber;
  private gameService = container.get<GameServiceInterface>(
    SERVICE_IDENTIFIER.GAME_SERVICE
  );

  private foodService = container.get<FoodServiceInterface>(
    SERVICE_IDENTIFIER.FOOD_SERVICE
  );

  private boardService = container.get<BoardServiceInterface>(
    SERVICE_IDENTIFIER.BOARD_SERVICE
  );

  constructor(game: GameDomain) {
    this.game = game;
    this.boundary = game.size - 1;
  }

  private comparePositions(position1: Position, position2: Position): boolean {
    const { x: x1, y: y1 } = position1;
    const { x: x2, y: y2 } = position2;
    if (x1 == x2 && y1 == y2) {
      return true;
    }
    return false;
  }

  setGame(game: GameDomain): GameDomain {
    this.game = game;
    return game;
  }

  newAvailablePosition(): Position {
    let newPosition: Position;
    let condition;
    const boundary = this.game.size - 1;
    const blockeSpaces = this.getBlockedSpaces();
    do {
      newPosition = {
        x: this.randomNumber(boundary),
        y: this.randomNumber(boundary),
      };
      condition = blockeSpaces.reduce((response, space) => {
        return this.comparePositions(newPosition, space);
      }, false);
    } while (condition);
    return newPosition;
  }

  private async locateSnakesOnBoard(): Promise<GameDomain> {
    const { snakes, board } = this.game;
    const coordinates = board.coordinates;
    snakes.forEach((snake) => {
      if (snake.status == "Alive") {
        const { head } = snake;
        coordinates[head.y][head.x] = "H";
        snake.nodes.forEach((node) => {
          coordinates[node.y][node.x] = "N";
        });
      }
    });
    board.coordinates = coordinates;
    this.game.board = board;
    return await this.gameService.updateGame(this.game);
  }

  private async locateFoodOnBoard(): Promise<GameDomain> {
    const { board, food } = this.game;
    const coordinates = board.coordinates;
    const { position } = food;
    coordinates[position.y][position.x] = "F";
    board.coordinates = coordinates;
    this.game.board = board;
    return await this.gameService.updateGame(this.game);
  }

  private getBlockedSpaces(): Position[] {
    const { snakes } = this.game;
    const blockedSpaces: Position[] = [];
    snakes.forEach((snake) => {
      blockedSpaces.push(snake.head);
      snake.nodes.forEach((node) => {
        blockedSpaces.push(node);
      });
    });
    return blockedSpaces;
  }

  private hasSnakeCollide(snake: SnakeDomain): boolean {
    let elementsOnSpace = 0;
    this.getBlockedSpaces().forEach((space) => {
      const samePosition = this.comparePositions(snake.head, space);
      if (samePosition) {
        ++elementsOnSpace;
      }
    });
    if (elementsOnSpace > 1) {
      return true;
    }
    return false;
  }

  private hasSnakeEaten(snake: SnakeDomain): boolean {
    const { food } = this.game;
    const samePosition = this.comparePositions(snake.head, food.position);
    if (samePosition) {
      return true;
    }
    return false;
  }

  private async clearBoard(): Promise<GameDomain> {
    const { board } = this.game;
    board.coordinates.forEach((row) => {
      row.fill("0");
    });
    this.game.board = board;
    return await this.gameService.updateGame(this.game);
  }

  private async changeFoodPosition(): Promise<GameDomain> {
    const { food } = this.game;
    food.position = this.newAvailablePosition();
    this.game.food = food;
    return await this.gameService.updateGame(this.game);
  }

  private async moveFrame(): Promise<GameDomain> {
    this.game = await this.gameService.findGame(this.game.id);
    const { snakes } = this.game;
    await Promise.all(
      snakes.map(async (snake, index) => {
        if (snake.status == "Alive") {
          snakes[index] = await this.snakeBehaviorService.moveStep(
            snake.id,
            this.boundary
          );
          if (this.hasSnakeEaten(snake)) {
            snakes[index] = await this.snakeBehaviorService.growUp(snake.id);
            await this.changeFoodPosition();
          }
        }
      })
    );
    await Promise.all(
      snakes.map(async (snake, index) => {
        if (this.hasSnakeCollide(snake)) {
          snakes[index] = await this.snakeBehaviorService.killSnake(snake.id);
        }
      })
    );
    this.game = await this.gameService.updateGame(this.game);
    return this.game;
  }

  async visualizeBoard(): Promise<string> {
    await this.clearBoard();
    await this.locateFoodOnBoard();
    await this.locateSnakesOnBoard();
    const { board } = this.game;
    const boardImage = JSON.stringify(board.coordinates);
    console.clear();
    console.log(board.coordinates.join("\n"));
    return boardImage;
  }

  async initialize(): Promise<GameDomain> {
    this.interval = setInterval(async () => {
      await this.moveFrame();
      await this.visualizeBoard();
      const snakesStatus = this.game.snakes.map((snake) => snake.status);
      if (!snakesStatus.includes("Alive")) {
        clearInterval(this.interval);
        this.game.state = "Ended";
        await this.gameService.updateGame(this.game);
      }
    }, this.game.interval);
    this.game.state = "Playing";
    this.game = await this.gameService.updateGame(this.game);
    return this.game;
  }

  async stop(): Promise<GameDomain> {
    clearInterval(this.interval);
    this.game.state = "Paused";
    this.game = await this.gameService.updateGame(this.game);
    return this.game;
  }

  async reset(): Promise<GameDomain> {
    clearInterval(this.interval);
    const { snakes } = this.game;
    this.game.snakes = await Promise.all(
      snakes.map(async (snake) => {
        return await this.snakeBehaviorService.restartSnake(snake.id, this.boundary);
      })
    );
    await this.changeFoodPosition();
    this.game.state = "Ready";
    this.game = await this.gameService.updateGame(this.game);
    return this.game;
  }
}
