import "reflect-metadata";
import { Container } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import UserRepository from "../../database/db_repository/UserRepository";
import { IUserRepository } from "../../domainRepository/IUserRepository";
import UserService from "../../appService/UserService";

const container = new Container();

container.bind<IUserRepository>(SERVICE_IDENTIFIER.USER_SERVICE).to(UserService);
container.bind<IUserRepository>(SERVICE_IDENTIFIER.USER_DB_REPOSITORY).to(UserRepository);

export default container;
