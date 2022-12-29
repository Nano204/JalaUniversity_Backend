import {
  Column,
  Entity,
  ObjectID,
  ObjectIdColumn,
} from "typeorm";


@Entity()
export class Game {
  @ObjectIdColumn()
  public _id!: ObjectID;

  @Column({ unique: true, nullable: false })
  public id!: number;

  @Column({ nullable: true })
  public interval!: number;

  @Column({ nullable: true })
  public state!: string;

  @Column({ nullable: true })
  public size!: number;

  @Column()
  public usersId?: number[];

  @Column()
  public boardId?: number;

  @Column()
  public snakesId!: number[];

  @Column()
  public foodId?: number;
}
