import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
// import IBoard from "../../domain/entities/IBoard";
// import { IUser } from "../../domain/entities/IUser";

@Entity()
export class Snake {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public head!: string;
  @Column({ nullable: true })
  public nodes!: string;
  // @Column()
  // public readonly board!: IBoard;
  // @Column()
  // public readonly owner!: IUser;
}
