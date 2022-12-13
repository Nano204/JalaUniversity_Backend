import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import IBoard from "../../domain/entities/IBoard";
// import { ISnake } from "../../domain/entities/ISnake";

@Entity()
export class Board implements IBoard {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public readonly sideLenght!: number;
  // @Column()
  // public readonly snakes!: ISnake[];
  @Column()
  public coordinates!: string;
  // public coordinates!: boolean[][];
}
