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
      const { head } = snake;
      coordinates[head.y][head.x] = "H";
      snake.nodes.forEach((node) => {
        coordinates[node.y][node.x] = "N";
      });
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
    console.log(this.getBlockedSpaces(), snake.head);
    this.getBlockedSpaces().forEach((space) => {
      const samePosition = this.comparePositions(snake.head, space);
      if (samePosition) {
        ++elementsOnSpace;
      }
    });
    console.log(elementsOnSpace);
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

  async visualizeBoard(): Promise<string> {
    await this.clearBoard();
    await this.locateFoodOnBoard();
    await this.locateSnakesOnBoard();
    const { board } = this.game;
    // console.clear();
    console.log(board.coordinates.join("\n"));
    return board.coordinates.join("\n");
  }

  async clearBoard(): Promise<GameDomain> {
    const { board } = this.game;
    board.coordinates.forEach((row) => {
      row.fill("0");
    });
    this.game.board = board;
    return await this.gameService.updateGame(this.game);
  }

  async changeFoodPosition(): Promise<GameDomain> {
    const { food } = this.game;
    food.position = this.newAvailablePosition();
    this.game.food = food;
    return await this.gameService.updateGame(this.game);
  }

  async moveFrame(): Promise<GameDomain> {
    this.game = await this.gameService.findGame(this.game.id);
    const { snakes } = this.game;
    await Promise.all(
      snakes.map(async (snake, index) => {
        snakes[index] = await this.snakeBehaviorService.moveStep(snake.id, this.boundary);
        if (this.hasSnakeEaten(snake)) {
          snakes[index] = await this.snakeBehaviorService.growUp(snake.id);
          await this.changeFoodPosition();
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
    this.game.snakes = snakes.filter((snake) => snake.status !== "Death");
    return await this.gameService.updateGame(this.game);
  }
}
