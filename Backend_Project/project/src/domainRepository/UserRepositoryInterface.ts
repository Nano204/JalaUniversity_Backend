import { UserDomain } from "../domain/entities/UserDomain";
import { DBDeletion } from "../domain/types/types";

export interface UserRepositoryInterface {
  save(user: UserDomain): Promise<UserDomain>;
  findById(id: number): Promise<UserDomain>;
  findMaxScoreRanking(limit: number): Promise<UserDomain[]>
  deleteById(id: number): Promise<DBDeletion>;
  findAll(): Promise<UserDomain[]>;
}