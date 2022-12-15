import { IUser } from "../../domain/entities/IUser";
import { User } from "./User";

export class userMapper {
  static toDBEntity(user: IUser) {
    const entityUser: User = new User();
    entityUser.id = user.id;
    entityUser.firstName = user.firstName;
    entityUser.lastName = user.lastName;
    return entityUser;
  }
  static toWorkUnit(user: User) {
    const workUser: IUser = new IUser();
    workUser.id = user.id;
    workUser.firstName = user.firstName;
    workUser.lastName = user.lastName;
    return workUser;
  }
}
