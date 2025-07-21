import { Controller, Body, Post, Get, Query, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto.email, loginDto.password);
        return this.authService.login(user);
    }

    @Get('verify-email')
    async verifyEmail(@Query('token') token: string) {
        const result = await this.authService.verifyEmail(token);
        if (!result) {
            throw new UnauthorizedException('Invalid verification token');
        }
        return { message: 'Email verified successfully' };
    }
}
