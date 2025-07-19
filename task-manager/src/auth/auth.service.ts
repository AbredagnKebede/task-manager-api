import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entity/user.entity';
import { access } from 'fs';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService
    ) {}

    async register(CreateUserDto: CreateUserDto) {
        const user = await this.userService.create(CreateUserDto);
        return user;
    }

    async validateUser(email: string, password: string) {
        const user = await this.userService.findByEmail(email); 
        if(!user || !(await bcrypt.compare(password, user.password))) { 
            throw new UnauthorizedException('Invalid credentials!');
        }
        return user;
    }

    async login(user: any) {
        const payload = {sub: user.id, email: user.email};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
