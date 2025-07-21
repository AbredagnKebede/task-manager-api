import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from "src/tasks/entity/task.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ default: false })
    isEmailVerified: boolean;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];
}