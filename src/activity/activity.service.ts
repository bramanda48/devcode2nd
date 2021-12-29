import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GlobalResponse } from 'src/response';
import { Repository } from 'typeorm';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';

@Injectable()
export class ActivityService {
    constructor(
        @InjectRepository(Activity) 
        public readonly activity: Repository<Activity>,
    ) {}

    async create(createActivityDto: CreateActivityDto): Promise<GlobalResponse<Activity>> {
        const createActivity: Activity = this.activity.create({
            email: createActivityDto.email,
            title: createActivityDto.title
        });
        
        // Insert new activity
        const insertActivity = await this.activity.save(createActivity);
        return new GlobalResponse<Activity>({
            status: 'Success',
            message: 'Success',
            data: insertActivity,
        });
    }

    async findAll(): Promise<GlobalResponse<Activity[]>> {
        const getActivity = await this.activity.find();
        return new GlobalResponse<Activity[]>({
            status: 'Success',
            message: 'Success',
            data: getActivity,
        });
    }

    async findOne(id: number): Promise<GlobalResponse<Activity>> {
        const getActivity: Activity = await this.activity.findOne(id);
        if(!getActivity) {
            throw new NotFoundException(new GlobalResponse<Activity>({
                status: 'Not Found',
                message: `Activity with ID ${id} Not Found`,
                data: getActivity,
            }));
        }

        return new GlobalResponse<Activity>({
            status: 'Success',
            message: 'Success',
            data: getActivity,
        });
    }

    async update(id: number, updateActivityDto: UpdateActivityDto): Promise<GlobalResponse<Activity>> {
        const getActivity: Activity = await this.activity.findOne(id);
        if(!getActivity) {
            throw new NotFoundException(new GlobalResponse<Activity>({
                status: 'Not Found',
                message: `Activity with ID ${id} Not Found`,
                data: getActivity,
            }));
        }

        // Update activity
        getActivity.title = updateActivityDto.title??getActivity.title;
        getActivity.email = updateActivityDto.email??getActivity.email;

        const updateActivity = await this.activity.save(getActivity);
        return new GlobalResponse<Activity>({
            status: 'Success',
            message: 'Success',
            data: updateActivity,
        });
    }

    async remove(id: number): Promise<GlobalResponse<object>> {
        const getActivity: Activity = await this.activity.findOne(id);
        if(!getActivity) {
            throw new NotFoundException(new GlobalResponse<Activity>({
                status: 'Not Found',
                message: `Activity with ID ${id} Not Found`,
                data: getActivity,
            }));
        }

        // Delete activity
        this.activity.softDelete({
            id: getActivity.id
        });
        return new GlobalResponse<object>({
            status: 'Success',
            message: 'Success',
            data: {},
        });
    }
}
