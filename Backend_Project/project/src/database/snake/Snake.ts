import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";
import { SnakeStatus } from "../../domain/types/types";


@Entity()
export class Snake {
  @ObjectIdColumn()
  public _id!: ObjectID;

  @Column({ unique: true, nullable: false })
  public id!: number;

  @Column({ nullable: true })
  public head!: string;

  @Column()
  public direction!: number;

  @Column()
  public status!: SnakeStatus;

  @Column({ nullable: true })
  public nodes!: string;

  @Column()
  public length!: number;

  @Column({ nullable: true })
  public nextNodeSpace!: string;

  @Column()
  public userId?: number;

  @Column()
  public gameId?: number;
}
