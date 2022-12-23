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
  public id!: number;
  @Column({ nullable: true })
  public interval!: number;
  @Column({ nullable: true })
  public state!: string;
  @Column({ nullable: true })
  public size!: number;
  @ManyToMany(() => User, (user) => user.games)
  public users!: User[];
  @OneToOne(() => Board, (board) => board.game, { cascade: true })
  @JoinColumn()
  public board!: Board;
  @OneToMany(() => Snake, (snake) => snake.game, { cascade: true })
  public snakes?: Snake[];
  @OneToOne(() => Food, (food) => food.game, { cascade: true })
  @JoinColumn()
  public food!: Food;
}
