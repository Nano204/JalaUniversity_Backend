import { UserDomain } from "../../domain/entities/UserDomain";
import { User } from "./User";

export class userMapper {
  static toDBEntity(user: UserDomain) {
    const entityUser: User = new User();
    entityUser.id = user.id;
    entityUser.firstName = user.firstName;
    entityUser.lastName = user.lastName;
    entityUser.maxScore = user.maxScore;
    return entityUser;
  }
  static toWorkUnit(user: User) {
    const workUser: UserDomain = new UserDomain();
    workUser.id = user.id;
    workUser.firstName = user.firstName;
    workUser.lastName = user.lastName;
    workUser.maxScore = user.maxScore;
    return workUser;
  }
}
