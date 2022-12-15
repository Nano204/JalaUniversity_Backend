import { IUser } from "../../domain/entities/IUser";

export interface IUserUnitOfWork {
  create(firstName: string, lastName: string): IUser;
}
