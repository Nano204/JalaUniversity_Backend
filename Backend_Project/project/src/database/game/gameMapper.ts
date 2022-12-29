import GameDomain from "../../domain/entities/GameDomain";
import { Game } from "./Game";
import { GameState } from "../../domain/types/types";
import { boardMapper } from "../board/boardMapper";
import { snakeMapper } from "../snake/snakeMapper";
import { userMapper } from "../user/userMapper";
import { foodMapper } from "../food/foodMapper";
import { User } from "../user/User";
import { AppDataSource } from "../DBConnection";
import { Board } from "../board/Board";
import { Snake } from "../snake/Snake";
import { Food } from "../food/Food";

export class gameMapper {
  static toDBEntity(game: GameDomain) {
    const entityGame: Game = new Game();
    if (game.id) {
      entityGame.id = game.id;
    }
    entityGame.state = game.state;
    entityGame.interval = game.interval;
    entityGame.size = game.size;
    if (game.users) {
      const unpurgeUserIdArray = game.users.map((user) => user.id);
      entityGame.usersId = [...new Set(unpurgeUserIdArray)];
    }
    if (game.board) {
      entityGame.boardId = game.board.id;
    }
    if (game.snakes) {
      const unpurgeSnakeIdArray = game.snakes.map((snakes) => snakes.id);
      entityGame.snakesId = [...new Set(unpurgeSnakeIdArray)];
    } else {
      entityGame.snakesId = [];
    }
    if (game.food) {
      entityGame.foodId = game.food.id;
    }
    return entityGame;
  }

  static async toWorkUnit(game: Game) {
    const workGame: GameDomain = new GameDomain();
    if (game.id) {
      workGame.id = game.id;
    }
    workGame.state = game.state as GameState;
    workGame.interval = game.interval;
    workGame.size = game.size;

    if (game.usersId) {
      workGame.users = await Promise.all(
        game.usersId.map(async (userId) => {
          const repository = AppDataSource.getRepository(User);
          const user = await repository.findOneBy({ id: userId });
          if (user) {
            return userMapper.toWorkUnit(user);
          } else {
            throw new Error("Not Found");
          }
        })
      );
    }

    if (game.boardId) {
      const repository = AppDataSource.getRepository(Board);
      const boardEntity = await repository.findOneBy({ id: game.boardId });
      if (boardEntity) {
        workGame.board = await boardMapper.toWorkUnit(boardEntity);
      }
    }

    if (game.snakesId) {
      workGame.snakes = await Promise.all(
        game.snakesId.map(async (snakeId) => {
          const repository = AppDataSource.getRepository(Snake);
          const snake = await repository.findOneBy({ id: snakeId });
          if (snake) {
            return snakeMapper.toWorkUnit(snake);
          } else {
            throw new Error("Not Found");
          }
        })
      );
    }

    if (game.foodId) {
      const repository = AppDataSource.getRepository(Food);
      const foodEntity = await repository.findOneBy({ id: game.foodId });
      if (foodEntity) {
        workGame.food = await foodMapper.toWorkUnit(foodEntity);
      }
    }
    
    return workGame;
  }
}
