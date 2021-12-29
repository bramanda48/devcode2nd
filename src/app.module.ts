import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityModule } from './activity/activity.module';
import { TodoModule } from './todo/todo.module';
import connectionOpts from './ormconfig';
import { AppController } from './app.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: ['.env'],
            isGlobal: true,
        }),

        // Typeorm module
        TypeOrmModule.forRoot(connectionOpts),
        
        // Other module
        ActivityModule, 
        TodoModule
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {}
