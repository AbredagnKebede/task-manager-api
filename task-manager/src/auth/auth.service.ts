import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entity/user.entity';
import { EmailVerificationService } from './email-verification/emial-verification.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UsersService,
        private jwtService: JwtService,
        private emailVerificationService: EmailVerificationService,
        private mailService: MailService
    ) {}

    async register(createUserDto: CreateUserDto) {
        const user = await this.userService.create(createUserDto);
        const token = await this.emailVerificationService.generateToken(user.id);
        await this.mailService.sendVerificationEmail(user.email, token);
        return { message: 'Registration successful. Please check your email for verification.' };
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

    async verifyEmail(token: string): Promise<boolean> {
        const userId = await this.emailVerificationService.verifyToken(token);
        if (!userId) return false;
        
        await this.userService.markEmailAsVerified(userId);
        return true;
    }
}
