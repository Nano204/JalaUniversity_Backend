import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class Food {
  @ObjectIdColumn()
  public _id!: ObjectID;

  @Column({ unique: true, nullable:false })
  public id!: number;

  @Column()
  public position!: string;
  
  @Column()
  public gameId!: number;
}
