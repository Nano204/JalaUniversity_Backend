import { IUser } from "../0_domain/entities/IUser";
import { DBDeletion } from "../0_domain/types/types";
import { AddUserRepositoryRequest } from "./userRequest/addUser";
import { DeleteUserRepositoryRequest } from "./userRequest/deleteUser";
import { FindUserRepositoryRequest } from "./userRequest/findUser";
import { UpdateUserRepositoryRequest } from "./userRequest/updateUser";

export interface IUserRepository {
  addUser(request: AddUserRepositoryRequest): Promise<IUser>;
  updateUser(request: UpdateUserRepositoryRequest): Promise<IUser>;
  findUser(request: FindUserRepositoryRequest): Promise<IUser | null>;
  deleteUser(request: DeleteUserRepositoryRequest): Promise<DBDeletion>;
  getAllUsers(): Promise<IUser[]>;
}
