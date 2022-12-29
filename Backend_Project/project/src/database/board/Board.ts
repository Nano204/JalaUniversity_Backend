import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Board {
  @ObjectIdColumn()
  public _id!: ObjectID;

  @Column({ unique: true, nullable:false })
  public id!: number;

  @Column()
  public coordinates!: string;
  
  @Column()
  public gameId!: number;
}
