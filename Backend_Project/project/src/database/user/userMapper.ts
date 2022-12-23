import { UserDomain } from "../../domain/entities/UserDomain";
import { snakeMapper } from "../snake/snakeMapper";
import { User } from "./User";

export class userMapper {
  static toDBEntity(user: UserDomain) {
    const entityUser: User = new User();
    if (user.id) {
      entityUser.id = user.id;
    }
    entityUser.firstName = user.firstName;
    entityUser.lastName = user.lastName;
    entityUser.maxScore = user.maxScore;
    if (user.snakes) {
      entityUser.snakes = user.snakes.map((snake) => snakeMapper.toDBEntity(snake));
    }
    return entityUser;
  }
  static toWorkUnit(user: User) {
    const workUser: UserDomain = new UserDomain();
    if (user.id) {
      workUser.id = user.id;
    }
    workUser.firstName = user.firstName;
    workUser.lastName = user.lastName;
    workUser.maxScore = user.maxScore;
    if (user.snakes) {
      workUser.snakes = user.snakes.map((snake) => snakeMapper.toWorkUnit(snake));
    }
    return workUser;
  }
}
