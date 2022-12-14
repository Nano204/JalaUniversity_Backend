import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Snake {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public head!: string;
  @Column({ nullable: true })
  public nodes!: string;
}
