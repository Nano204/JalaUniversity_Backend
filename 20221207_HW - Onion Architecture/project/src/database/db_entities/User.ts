import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../../domain/entities/IUser";

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public readonly firstName!: string;
  @Column()
  public readonly lastName!: string;
}
