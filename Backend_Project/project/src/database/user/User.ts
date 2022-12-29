import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
  PrimaryColumn,
} from "typeorm";

@Entity()
export class User {
  @ObjectIdColumn()
  public _id!: ObjectID;

  @PrimaryColumn({ nullable: false })
  public id!: number;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public maxScore!: number;

  @Column()
  public gamesId?: number[];

  @Column()
  public snakesId?: number[];
}
