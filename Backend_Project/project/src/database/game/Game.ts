import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../user/User";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public speed!: number;
  @Column()
  public state!: string;
  @ManyToMany(() => User)
  public users!: User[];
  // @OneToOne(() => Board, (board) => board.gameId)
  // public boardId!: number;
}
