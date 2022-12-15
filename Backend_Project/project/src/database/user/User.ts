import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../../domain/entities/IUser";
import { Game } from "../game/Game";

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  public id!: number;
  @Column()
  public firstName!: string;
  @Column()
  public lastName!: string;
  @ManyToMany(() => Game, (game) => game.users, { cascade: true })
  @JoinTable()
  public games!: Game[];
}
