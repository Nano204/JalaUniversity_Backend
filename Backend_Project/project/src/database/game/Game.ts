import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Game {
  @PrimaryGeneratedColumn()
  public id!: number;
  @Column()
  public speed!: number;
  @Column()
  public state!: string;
  @Column()
  public users!: string;
  @Column()
  public board!: string;
  @Column()
  public snakes?: string;
  @Column()
  public size?: number;
  @Column()
  public food?: string;
}
