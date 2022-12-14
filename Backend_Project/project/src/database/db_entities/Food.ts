import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public position!: string;
}
