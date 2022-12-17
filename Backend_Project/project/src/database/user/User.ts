import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  Unique,
} from "typeorm";
import { UserDomain } from "../../domain/entities/UserDomain";
import { Game } from "../game/Game";

@Entity()
@Unique(["firstName", "lastName"])
export class User implements UserDomain {
  @PrimaryGeneratedColumn()
  public id!: number;
  @Column()
  public firstName!: string;
  @Column()
  public lastName!: string;
  @Column({ nullable: true })
  public maxScore!: number;
  @ManyToMany(() => Game, (game) => game.users, {
    cascade: true,
  })
  @JoinTable({ name: "games_users" })
  public games!: Game[];
}
