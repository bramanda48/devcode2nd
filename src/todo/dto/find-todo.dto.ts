import { IsNumber, IsOptional } from "class-validator";

export class FindTodoDto {
    @IsNumber()
    @IsOptional()
    activity_group_id: number;
}