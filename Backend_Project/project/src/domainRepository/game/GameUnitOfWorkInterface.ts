import GameDomain from "../../domain/entities/GameDomain";

export interface GameUnitOfWorkInterface {
  create(speed: number): GameDomain;
}
