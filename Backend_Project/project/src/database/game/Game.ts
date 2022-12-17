import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Board } from "../board/Board";
import { User } from "../user/User";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public speed!: number;
  @Column()
  public state!: string;
  @ManyToMany(() => User, (user) => user.games)
  @JoinTable({ name: "games_users" })
  public users!: User[];
  @OneToOne(() => Board, (board) => board.game, { cascade: true })
  @JoinColumn()
  public board!: Board;
}
