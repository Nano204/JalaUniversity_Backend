import { UserDomain } from "../../../domain/entities/UserDomain";

export interface GameBuilderInterface {
  setSpeed(speed: number): void;
  setUsers(users: UserDomain[]): void;
  setBoard(size: number): void;
  setSize(size: number): void;
  setSnakes(): void;
}
