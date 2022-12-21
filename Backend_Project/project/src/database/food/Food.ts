import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "../game/Game";

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public position!: string;
  @OneToOne(() => Game, (game) => game.food)
  public game!: Game | undefined;
}
