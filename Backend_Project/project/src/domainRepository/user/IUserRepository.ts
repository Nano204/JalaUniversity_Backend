import { IUser } from "../../domain/entities/IUser";
import { DBDeletion } from "../../domain/types/types";

export interface IUserRepository {
  add(user: IUser): Promise<IUser>;
  update(user: IUser): Promise<IUser>;
  find(id: number): Promise<IUser | null>;
  delete(id: number): Promise<DBDeletion>;
  getAll(): Promise<IUser[]>;
}
