import { Entity, BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("myblog")
export class Users {
  @PrimaryGeneratedColumn("increment")
  id: string;

  @Column({ type: "varchar", unique: true })
  email: string;

  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  password: string;

  @Column("bool")
  isAdmin: boolean = false;
}
