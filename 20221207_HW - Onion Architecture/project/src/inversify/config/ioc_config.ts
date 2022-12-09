import "reflect-metadata";
import { Container } from "inversify";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import UserService from "../../database/db_repository/UserRepository";
import { IUserRepository } from "../../core/1_domainRepository/IUserRepository";

const container = new Container();

container.bind<IUserRepository>(SERVICE_IDENTIFIER.USER_REPOSITORY).to(UserService);

export default container;
