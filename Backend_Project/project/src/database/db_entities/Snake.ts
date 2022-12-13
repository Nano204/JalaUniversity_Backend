import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import IBoard from "../../domain/entities/IBoard";
import { INode } from "../../domain/entities/INode";
import { ISnake } from "../../domain/entities/ISnake";
import { IUser } from "../../domain/entities/IUser";
import { Position } from "../../domain/types/types";

@Entity()
export class Snake implements ISnake {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public readonly head!: Position;
  @Column()
  public readonly nodes!: INode[];
  @Column()
  public readonly board!: IBoard;
  @Column()
  public readonly owner!: IUser;
}
