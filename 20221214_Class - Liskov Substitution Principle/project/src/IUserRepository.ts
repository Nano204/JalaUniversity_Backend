import { IRepository } from "./IRepository";

export interface IUserRepository extends IRepository {
  update<Type>(request: Type): void;
  delete<Type>(request: number): Type;
}
