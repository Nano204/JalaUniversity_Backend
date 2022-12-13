import "reflect-metadata";
import { Container } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import UserRepository from "../../database/db_repository/UserRepository";
import { IUserRepository } from "../../domainRepository/IUserRepository";
import UserService from "../../appService/UserService";
import BoardService from "../../appService/BoardService";
import { IBoardRepository } from "../../domainRepository/IBoardRepository";
import BoardRepository from "../../database/db_repository/BoardRepository";

const container = new Container();

container.bind<IUserRepository>(SERVICE_IDENTIFIER.USER_SERVICE).to(UserService);
container.bind<IUserRepository>(SERVICE_IDENTIFIER.USER_DB_REPOSITORY).to(UserRepository);
container.bind<IBoardRepository>(SERVICE_IDENTIFIER.BOARD_SERVICE).to(BoardService);
container.bind<IBoardRepository>(SERVICE_IDENTIFIER.BOARD_DB_REPOSITORY).to(BoardRepository);

export default container;
