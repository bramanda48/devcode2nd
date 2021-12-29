import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateTodoDto {
    @IsNumber()
    @IsNotEmpty({
        message: 'activity_group_id cannot be null'
    })
    activity_group_id: number;

    @IsNotEmpty({
        message: 'title cannot be null'
    })
    title: string;
}
