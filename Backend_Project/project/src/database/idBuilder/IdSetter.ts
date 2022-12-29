import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class IdSetter {
  @ObjectIdColumn()
  public id!: ObjectID;
  
  @Column({ nullable: true })
  public lastGameId!: number;
  
  @Column({ nullable: true })
  public lastSnakeId!: number;

  @Column({ nullable: true })
  public lastBoardId!: number;

  @Column({ nullable: true })
  public lastUserId!: number;

  @Column({ nullable: true })
  public lastFoodId!: number;
}
