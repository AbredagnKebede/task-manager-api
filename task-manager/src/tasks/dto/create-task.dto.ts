import { IsNotEmpty, IsString, IsOptional,IsBoolean } from "class-validator";

export class CreateTaskDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    descripition?: string;
}