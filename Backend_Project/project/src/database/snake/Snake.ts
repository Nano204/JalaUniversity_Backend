import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Snake {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public head!: string;
  @Column()
  public direction!: number;
  @Column({ nullable: true })
  public nodes!: string;
  @Column()
  public gameId!: number;
  @Column()
  public ownerId!: number;
}
