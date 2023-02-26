import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ReportEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column({ nullable: false })
    public type!: string;

    @Column({ nullable: false })
    public report!: string;
}

export class ReportDTO {
    public id!: string;
    public type!: string;
    public report!: ReturnType<JSON["parse"]>;
}