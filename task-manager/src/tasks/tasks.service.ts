import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entity/task.entit';
import { User } from 'src/users/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,

    ) {}

    async create(createTaskDto: CreateTaskDto, user: User) {
        const task = this.taskRepository.create({...createTaskDto, user})
        return this.taskRepository.save(task);
    }

    findAll(user: User) {
        return this.taskRepository.find({where: {user}});
    }

    findOne(id: string, user: User) {
        return this.taskRepository.findOne({where: { id, user } });
    }

    async update(id: string, updateTaskDto: UpdateTaskDto, user: User) {
        const task = await this.findOne(id, user);
        if(!task) return null;
        Object.assign(task, updateTaskDto);
        return this.taskRepository.remove(task);
    }

    async remove(id: string, user: User) {
        const task = await this.findOne(id, user);
        if(!task) return null;
        return this.taskRepository.remove(task);
    }
}
