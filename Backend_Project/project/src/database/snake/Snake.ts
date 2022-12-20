import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { SnakeStatus } from "../../domain/types/types";
import { Game } from "../game/Game";

@Entity()
export class Snake {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
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
  @Column({ nullable: true })
  public gameId?: number;
}
