import { Task } from "src/tasks/entity/task.entit";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({unique: true})
    email: string;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

    @Column()
    password: string;

}