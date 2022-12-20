import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SnakeStatus } from "../../domain/types/types";
import { Game } from "../game/Game";

@Entity()
export class Snake {
  @PrimaryGeneratedColumn()
  public id!: number;
  @Column({ nullable: true })
  public head!: string;
  @Column()
  public direction!: number;
  @Column({ nullable: true })
  public nodes!: string;
  @Column()
  public status!: SnakeStatus;
  @Column()
  public length!: number;
  @Column({ nullable: true })
  public ownerId!: number;
  @ManyToOne(() => Game, (game) => game.snakes)
  @JoinColumn()
  public game?: Game;
}
