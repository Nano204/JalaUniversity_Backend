import { IUserRepository } from "./IUserRepository";

export class UserRepository implements IUserRepository {
  update<User>(request: User): void {
    console.log(request);
    throw new Error("Method not implemented.");
  }
  delete<User>(request: number): User {
    console.log(request);
    throw new Error("Method not implemented.");
  }
  insert<User>(request: User): void {
    console.log(request);

    throw new Error("Method not implemented.");
  }
  get<User>(request: number): User {
    console.log(request);
    throw new Error("Method not implemented.");
  }
}
