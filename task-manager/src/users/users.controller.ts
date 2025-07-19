import { Controller, Body, Post, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    crete(@Body() CreateUserDto: CreateUserDto) {
        return this.usersService.create(CreateUserDto);
    }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }
}
