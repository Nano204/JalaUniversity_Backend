import "reflect-metadata";
import { Container } from "inversify";
import SERVICE_IDENTIFIER from "./identifiers";
import UserRepository from "../database/user/UserRepository";
import { UserRepositoryInterface } from "../domainRepository/UserRepositoryInterface";
import UserService from "../appService/user/UserService";
import BoardService from "../appService/board/BoardService";
import { BoardRepositoryInterface } from "../domainRepository/BoardRepositoryInterface";
import BoardRepository from "../database/board/BoardRepository";
import { SnakeRepositoryInterface } from "../domainRepository/SnakeRepositoryInterface";
import SnakeService from "../appService/snake/SnakeService";
import { SnakeRepository } from "../database/snake/SnakeRepository";
import { FoodRepository } from "../database/food/FoodRepository";
import { FoodRepositoryInterface } from "../domainRepository/FoodRepositoryInventory";
import FoodService from "../appService/food/FoodService";
import { UserServiceInterface } from "../appService/user/UserServiceInterface";
import { BoardServiceInterface } from "../appService/board/BoardServiceInterface";
import { SnakeServiceInterface } from "../appService/snake/SnakeServiceInterface";
import { FoodServiceInterface } from "../appService/food/FoodServiceInterface";
import GameService from "../appService/game/GameService";
import { GameRepository } from "../database/game/GameRepository";
import { GameRepositoryInterface } from "../domainRepository/GameRepositoryInterface";
import { GameServiceInterface } from "../appService/game/GameServiceInterface";

const container = new Container();

container.bind<UserServiceInterface>(SERVICE_IDENTIFIER.USER_SERVICE).to(UserService);
container
  .bind<UserRepositoryInterface>(SERVICE_IDENTIFIER.USER_DB_REPOSITORY)
  .to(UserRepository);

container.bind<BoardServiceInterface>(SERVICE_IDENTIFIER.BOARD_SERVICE).to(BoardService);
container
  .bind<BoardRepositoryInterface>(SERVICE_IDENTIFIER.BOARD_DB_REPOSITORY)
  .to(BoardRepository);

container.bind<SnakeServiceInterface>(SERVICE_IDENTIFIER.SNAKE_SERVICE).to(SnakeService);
container
  .bind<SnakeRepositoryInterface>(SERVICE_IDENTIFIER.SNAKE_DB_REPOSITORY)
  .to(SnakeRepository);

container
  .bind<FoodRepositoryInterface>(SERVICE_IDENTIFIER.FOOD_DB_REPOSITORY)
  .to(FoodRepository);
container.bind<FoodServiceInterface>(SERVICE_IDENTIFIER.FOOD_SERVICE).to(FoodService);

container
  .bind<GameRepositoryInterface>(SERVICE_IDENTIFIER.GAME_DB_REPOSITORY)
  .to(GameRepository);
container.bind<GameServiceInterface>(SERVICE_IDENTIFIER.GAME_SERVICE).to(GameService);

export default container;
