import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivityService } from 'src/activity/activity.service';
import { empty, GlobalResponse } from 'src/response';
import { FindConditions, Repository } from 'typeorm';
import { CreateTodoDto } from './dto/create-todo.dto';
import { FindTodoDto } from './dto/find-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo) 
        public readonly todo: Repository<Todo>,
        public readonly activityService: ActivityService,
    ) {}

    async create(createTodoDto: CreateTodoDto): Promise<GlobalResponse<Todo>> {
        try {
            await this.activityService.findOne(createTodoDto.activity_group_id);
        } catch(e) {
            throw new NotFoundException(new GlobalResponse<object>({
                status: 'Not Found',
                message: `Activity with activity_group_id ${createTodoDto.activity_group_id} Not Found`,
                data: {},
            }));
        }

        const createTodo: Todo = this.todo.create({
            activity_group_id: createTodoDto.activity_group_id,
            title: createTodoDto.title
        });
        
        // Insert new todo
        const insertTodo = await this.todo.save(createTodo);
        return new GlobalResponse<Todo>({
            status: 'Success',
            message: 'Success',
            data: insertTodo,
        });
    }

    async findAll(findTodoDto: FindTodoDto): Promise<GlobalResponse<Todo[]>> {
        let where: FindConditions<Todo> = {};
        if(!empty(findTodoDto.activity_group_id)) {
            where.activity_group_id = findTodoDto.activity_group_id;
        }
        const getTodo = await this.todo.find({
            where: where
        });
        return new GlobalResponse<Todo[]>({
            status: 'Success',
            message: 'Success',
            data: getTodo,
        });
    }

    async findOne(id: number): Promise<GlobalResponse<Todo>> {
        const getTodo: Todo = await this.todo.findOne(id);
        if(!getTodo) {
            throw new NotFoundException(new GlobalResponse<Todo>({
                status: 'Not Found',
                message: `Todo with ID ${id} Not Found`,
                data: getTodo,
            }));
        }

        return new GlobalResponse<Todo>({
            status: 'Success',
            message: 'Success',
            data: getTodo,
        });
    }

    async update(id: number, updateTodoDto: UpdateTodoDto): Promise<GlobalResponse<object>> {
        const getTodo: Todo = await this.todo.findOne(id);
        if(!getTodo) {
            throw new NotFoundException(new GlobalResponse<Todo>({
                status: 'Not Found',
                message: `Todo with ID ${id} Not Found`,
                data: getTodo,
            }));
        }

        // Update todo
        getTodo.title = updateTodoDto.title??getTodo.title;
        getTodo.activity_group_id = updateTodoDto.activity_group_id??getTodo.activity_group_id;
        getTodo.priority = updateTodoDto.priority??getTodo.priority;
        getTodo.is_active = updateTodoDto.is_active??getTodo.is_active;

        const updateTodo = await this.todo.save(getTodo);
        return new GlobalResponse<object>({
            status: 'Success',
            message: 'Success',
            data: {
                "id": updateTodo.id,
                "activity_group_id": updateTodo.activity_group_id,
                "title": updateTodo.title,
                "is_active": updateTodo.is_active?"1":"0",
                "priority": updateTodo.priority,
                "created_at": updateTodo.created_at,
                "updated_at": updateTodo.updated_at,
                "deleted_at": updateTodo.deleted_at
            },
        });
    }

    async remove(id: number): Promise<GlobalResponse<object>> {
        const getTodo: Todo = await this.todo.findOne(id);
        if(!getTodo) {
            throw new NotFoundException(new GlobalResponse<Todo>({
                status: 'Not Found',
                message: `Todo with ID ${id} Not Found`,
                data: getTodo,
            }));
        }

        // Delete todo
        this.todo.softDelete({
            id: getTodo.id
        });
        return new GlobalResponse<object>({
            status: 'Success',
            message: 'Success',
            data: {},
        });
    }
}
