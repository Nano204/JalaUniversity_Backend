import { IUser } from "../domain/entities/IUser";
import { DBDeletion } from "../domain/types/types";

export interface IUserRepository {
  addUser(user: IUser): Promise<IUser>;
  updateUser(user: IUser): Promise<IUser>;
  findUser(id: number): Promise<IUser | null>;
  deleteUser(id: number): Promise<DBDeletion>;
  getAllUsers(): Promise<IUser[]>;
}
