import { IRepository } from "./IRepository";

export class LogRepository implements IRepository {
  insert<Log>(request: Log): void {
    console.log(request);
    throw new Error("Method not implemented.");
  }
  get<Log>(request: number): Log {
    console.log(request);
    throw new Error("Method not implemented.");
  }
}
