import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public boardId!: number;
  @Column()
  public snakes!: string;
  @Column()
  public users!: string;
  @Column()
  public foodId!: number;
}
