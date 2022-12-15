import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "../game/Game";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public coordinates!: string;
  // @OneToOne(() => Game, (game) => game.boardId)
  // public gameId!: number;
}
