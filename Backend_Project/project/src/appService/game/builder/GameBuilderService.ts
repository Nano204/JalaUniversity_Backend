import SERVICE_IDENTIFIER from "../../../dependencies/identifiers";
import container from "../../../dependencies/ioc_config";
import GameDomain from "../../../domain/entities/GameDomain";
import { GameState } from "../../../domain/types/types";
import { GameServiceInterface } from "../GameServiceInterface";
import { GameBuilderInterface } from "./GameBuilderServiceInterface";
import { UserServiceInterface } from "../../user/UserServiceInterface";
import SnakeBehaviorService from "../../snake/behavior/SnakeBehaviorService";
import { BoardServiceInterface } from "../../board/BoardServiceInterface";
import { FoodServiceInterface } from "../../food/FoodServiceInterface";

export default class GameBuilder implements GameBuilderInterface {
  private gameService = container.get<GameServiceInterface>(
    SERVICE_IDENTIFIER.GAME_SERVICE
  );
  private userService = container.get<UserServiceInterface>(
    SERVICE_IDENTIFIER.USER_SERVICE
  );
  private boardService = container.get<BoardServiceInterface>(
    SERVICE_IDENTIFIER.BOARD_SERVICE
  );
  private foodSercive = container.get<FoodServiceInterface>(
    SERVICE_IDENTIFIER.FOOD_SERVICE
  );

  private snakeBehavior = new SnakeBehaviorService();

  private async setSnakes(gameId: number): Promise<GameDomain> {
    const game = await this.gameService.findGame(gameId);

    if (game.users) {
      game.snakes = [];
      await Promise.all(
        game.users.map(async (user) => {
          const snake = await this.snakeBehavior.buildNewSnake(user.id, game.size);
          if (game.snakes) {
            game.snakes.push(snake);
          }
        })
      );
    }
    return await this.gameService.updateGame(game);
  }

  private async setBoard(gameId: number): Promise<GameDomain> {
    const game = await this.gameService.findGame(gameId);
    const board = await this.boardService.createNew(game.size);
    game.board = board;
    return await this.gameService.updateGame(game);
  }

  private async setFood(gameId: number): Promise<GameDomain> {
    const game = await this.gameService.findGame(gameId);
    const food = await this.foodSercive.createNew(game.size);
    game.food = food;
    return await this.gameService.updateGame(game);
  }

  async setState(gameId: number, state: GameState): Promise<GameDomain> {
    const game = await this.gameService.findGame(gameId);
    game.state = state;
    return await this.gameService.updateGame(game);
  }

  async setSpeed(gameId: number, speed: number): Promise<GameDomain> {
    const game = await this.gameService.findGame(gameId);
    game.interval = speed;
    return await this.gameService.updateGame(game);
  }

  async setSize(gameId: number, size: number): Promise<GameDomain> {
    const game = await this.gameService.findGame(gameId);
    game.size = size;
    return await this.gameService.updateGame(game);
  }

  async setUsers(gameId: number, usersId: number[]): Promise<GameDomain> {
    const game = await this.gameService.findGame(gameId);
    await Promise.all(
      usersId.map(async (userId) => {
        const user = await this.userService.findUser(userId);
        if (game.users) {
          game.users.push(user);
        } else {
          game.users = [user];
        }
      })
    );
    return await this.gameService.updateGame(game);
  }

  async buildGame(gameId: number): Promise<GameDomain> {
    const game = await this.gameService.findGame(gameId);
    if (game && game.interval && game.size && game.users?.length) {
      await this.setState(gameId, "Ready");
      await this.setBoard(gameId);
      await this.setSnakes(gameId);
      return await this.setFood(gameId);
    } else {
      throw new Error("Some parameter still missing");
    }
  }
}
