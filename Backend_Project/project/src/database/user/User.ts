import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { Game } from "../game/Game";
import { Snake } from "../snake/Snake";

@Entity()
@Unique(["firstName", "lastName"])
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;
  @Column()
  public firstName!: string;
  @Column()
  public lastName!: string;
  @Column()
  public maxScore!: number;
  @ManyToMany(() => Game, (game) => game.users, {
    cascade: true,
  })
  @JoinTable({ name: "games_users" })
  public games?: Game[];
  @OneToMany(() => Snake, (snake) => snake.user, {
    cascade: true,
  })
  public snakes?: Snake[];
}
