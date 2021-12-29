import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activity-groups')
export class ActivityController {
    constructor(
        private readonly activityService: ActivityService
    ) {}

    @Post()
    async create(@Body() rawData: CreateActivityDto) {
        return this.activityService.create(rawData);
    }

    @Get()
    findAll() {
        return this.activityService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.activityService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateActivityDto: UpdateActivityDto) {
        return this.activityService.update(+id, updateActivityDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.activityService.remove(+id);
    }
}
