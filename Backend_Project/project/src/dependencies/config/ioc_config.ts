import "reflect-metadata";
import { Container } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import UserRepository from "../../database/user/UserRepository";
import { IUserRepository } from "../../domainRepository/user/IUserRepository";
import UserService from "../../appService/user/UserService";
import BoardService from "../../appService/board/BoardService";
import { IBoardRepository } from "../../domainRepository/board/IBoardRepository";
import BoardRepository from "../../database/board/BoardRepository";
import { ISnakeRepository } from "../../domainRepository/snake/ISnakeRepository";
import SnakeService from "../../appService/snake/SnakeService";
import { SnakeRepository } from "../../database/snake/SnakeRepository";
import { FoodRepository } from "../../database/food/FoodRepository";
import { IFoodRepository } from "../../domainRepository/food/IFoodRepository";
import { IGameRepository } from "../../domainRepository/game/IGameRepository";
import GameService from "../../appService/game/GameService";
import FoodService from "../../appService/food/FoodService";
import { GameRepository } from "../../database/game/GameRepository";

const container = new Container();

container.bind<IUserRepository>(SERVICE_IDENTIFIER.USER_SERVICE).to(UserService);
container.bind<IUserRepository>(SERVICE_IDENTIFIER.USER_DB_REPOSITORY).to(UserRepository);
container.bind<IBoardRepository>(SERVICE_IDENTIFIER.BOARD_SERVICE).to(BoardService);
container
  .bind<IBoardRepository>(SERVICE_IDENTIFIER.BOARD_DB_REPOSITORY)
  .to(BoardRepository);
container.bind<ISnakeRepository>(SERVICE_IDENTIFIER.SNAKE_SERVICE).to(SnakeService);
container
  .bind<ISnakeRepository>(SERVICE_IDENTIFIER.SNAKE_DB_REPOSITORY)
  .to(SnakeRepository);
container.bind<IFoodRepository>(SERVICE_IDENTIFIER.FOOD_DB_REPOSITORY).to(FoodRepository);
container.bind<IFoodRepository>(SERVICE_IDENTIFIER.FOOD_SERVICE).to(FoodService);
container.bind<IGameRepository>(SERVICE_IDENTIFIER.GAME_DB_REPOSITORY).to(GameRepository);
container.bind<IGameRepository>(SERVICE_IDENTIFIER.GAME_SERVICE).to(GameService);

export default container;
