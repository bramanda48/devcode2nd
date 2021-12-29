import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateActivityDto {
    @IsNotEmpty({
        message: 'title cannot be null'
    })
    title: string;

    @IsEmail()
    @IsOptional()
    email: string;
}
