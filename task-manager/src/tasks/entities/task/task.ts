import { User } from "src/users/entity/user/user";
import { Entity, PrimaryColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Task {
    @PrimaryColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: string;

    @ManyToOne(() => User, (user) => user.tasks)
    user: User;
}
