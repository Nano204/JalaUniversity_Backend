import "reflect-metadata";
import { Container } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import UserRepository from "../../database/db_repository/UserRepository";
import { IUserRepository } from "../../domainRepository/IUserRepository";
import UserService from "../../appService/UserService";
import BoardService from "../../appService/BoardService";
import { IBoardRepository } from "../../domainRepository/IBoardRepository";
import BoardRepository from "../../database/db_repository/BoardRepository";
import { ISnakeRepository } from "../../domainRepository/ISnakeRepository";
import SnakeService from "../../appService/SnakeService";
import { SnakeRepository } from "../../database/db_repository/SnakeRepository";
import { FoodRepository } from "../../database/db_repository/FoodRepository";
import { IFoodRepository } from "../../domainRepository/IFoodRepository";
import { IGameRepository } from "../../domainRepository/IGameRepository";
import GameService from "../../appService/GameService";
import FoodService from "../../appService/FoodService";
import { GameRepository } from "../../database/db_repository/GameRepository";

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
