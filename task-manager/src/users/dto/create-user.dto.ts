import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsEmail()
    email: string;

    @IsString()
    name: string;
    
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
}
