import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public coordinates!: string;
}