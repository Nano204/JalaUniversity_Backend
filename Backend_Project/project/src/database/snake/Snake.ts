import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SnakeStatus } from "../../domain/types/types";
import { Game } from "../game/Game";
import { User } from "../user/User";

@Entity()
export class Snake {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column({ nullable: true })
  public head!: string;
  @Column()
  public direction!: number;
  @Column()
  public status!: SnakeStatus;
  @Column({ nullable: true })
  public nodes!: string;
  @Column()
  public length!: number;
  @Column({ nullable: true })
  public nextNodeSpace!: string;
  @ManyToOne(() => User, (user) => user.snakes)
  @JoinColumn()
  public user?: User;
  @ManyToOne(() => Game, (game) => game.snakes)
  @JoinColumn()
  public game?: Game;
}
