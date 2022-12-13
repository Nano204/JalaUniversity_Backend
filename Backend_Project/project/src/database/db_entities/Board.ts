import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import { ISnake } from "../../domain/entities/ISnake";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public coordinates!: string;
  // @Column()
  // public readonly snakes!: ISnake[];
  // public coordinates!: boolean[][];
}
