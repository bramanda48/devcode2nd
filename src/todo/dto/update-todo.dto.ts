import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTodoDto {
    @IsString()
    @IsOptional()
    title: string;

    @IsBoolean()
    @IsOptional()
    is_active: boolean;

    @IsNumber()
    @IsOptional()
    activity_group_id: number;

    @IsString()
    @IsOptional()
    priority: string;
}
