import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("URI")
export class URI {
    @Column()
    @PrimaryColumn()
    public fileId!: string;

    @Column()
    @PrimaryColumn()
    public accountId!: string;

    @Column({ nullable: true })
    public onDriveId?: string;

    @Column({ nullable: true })
    public webContentLink?: string;
}
