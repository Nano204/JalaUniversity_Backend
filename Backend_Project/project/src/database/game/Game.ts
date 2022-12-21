import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Board } from "../board/Board";
import { Food } from "../food/Food";
import { Snake } from "../snake/Snake";
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
  public users!: User[];
  @OneToOne(() => Board, (board) => board.game, { cascade: true })
  @JoinColumn()
  public board!: Board;
  @OneToMany(() => Snake, (snake) => snake.game, { cascade: true })
  public snakes?: Snake[];
  @Column()
  public size!: number;
  @OneToOne(() => Food, (food) => food.game, { cascade: true })
  public food!: string;
}
