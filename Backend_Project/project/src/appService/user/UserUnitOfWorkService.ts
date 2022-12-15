import { IUser } from "../../domain/entities/IUser";
import { IUserUnitOfWork } from "../../domainRepository/user/IUserUnitOfWork";

export default class UserUnitOfWorkService implements IUserUnitOfWork {
  create(firstName: string, lastName: string): IUser {
    const user = new IUser();
    user.firstName = firstName;
    user.lastName = lastName;
    return user;
  }
}
