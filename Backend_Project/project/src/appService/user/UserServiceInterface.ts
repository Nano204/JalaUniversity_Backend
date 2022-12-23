import { UserDomain } from "../../domain/entities/UserDomain";
import { DBDeletion } from "../../domain/types/types";

export interface UserServiceInterface {
  createNew(firstName: string, lastName: string): Promise<UserDomain>;
  updateUser(user: UserDomain): Promise<UserDomain>;
  findUser(id: number): Promise<UserDomain>;
  findMaxScoreRanking(limit: number): Promise<UserDomain[]>
  deleteUser(id: number): Promise<DBDeletion>;
  findAllUsers(): Promise<UserDomain[]>;
}
