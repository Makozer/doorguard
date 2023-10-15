// Zuständigkeit: M

import { Controller, Get, Query } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { GuardEvent } from './entitys/guardevent.entity';

@Controller('database')
export class DatabaseController {
    constructor(private service: DatabaseService){}

    @Get("/events")
    getEvents(@Query() query: any) {
        const ge = query as Partial<GuardEvent>;

        // If any Parameters are given they will used as filter, if no are given, returns all tags
        if (Object.keys(query).length > 0) {
        // console.log('TagsDBController.getTags.filtered');
        return this.service.getEvents(ge);
        } else {
        // console.log('TagsDBController.getTags.all');
        return this.service.getAllEvents();
        }
    }

    @Get("/log")
    getLog() {
        return this.service.getLog();
    }
}
