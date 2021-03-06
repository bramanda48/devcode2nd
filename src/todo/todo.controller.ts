import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo-items')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    create(@Body() createTodoDto: CreateTodoDto) {
        return this.todoService.create(createTodoDto);
    }

    @Get()
    findAll(
        @Query('activity_group_id') activity_group_id: number
    ) {
        return this.todoService.findAll({
            activity_group_id: activity_group_id
        });
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todoService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
        return this.todoService.update(+id, updateTodoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todoService.remove(+id);
    }
}
