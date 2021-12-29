import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { ActivityModule } from 'src/activity/activity.module';

@Module({
    imports: [
        ActivityModule,
        TypeOrmModule.forFeature([
            Todo,
        ]),
    ],
    controllers: [TodoController],
    providers: [TodoService]
})
export class TodoModule {}
