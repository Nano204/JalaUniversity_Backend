import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ILocation } from "./Ilocation";

@Entity()
export class Location implements ILocation {
  @PrimaryGeneratedColumn()
  public readonly id!: number;
  @Column()
  public readonly name!: string;
  @Column()
  public readonly type!: string;
  @Column()
  public readonly dimension!: string;
}
