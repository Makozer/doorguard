// Zuständigkeit: M

import { BadRequestException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { Repository } from 'typeorm';
import { GuardEvent } from './entitys/guardevent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ButtonEvent } from 'src/events/button.event';
import { BellEvent } from 'src/events/bell.event';
import { DoorEvent } from 'src/events/door.event';
import { RiseEvent } from 'src/events/rise.event';
import { FrontendService } from 'src/frontend/frontend.service';

@Injectable()
export class DatabaseService {

    constructor(@InjectRepository(GuardEvent) private db: Repository<GuardEvent>, private frontend: FrontendService) {

    }

    async create(event: GuardEvent) {
        const dbevent = this.db.create(event);
        return this.db.save(dbevent);
    }

    eventToEntity(event:any, type: string) {
        let ge = new GuardEvent();
        ge.timestamp = event.timestamp;
        ge.type = type;
        return ge;
    }

    async getAllEvents() {
        return await this.db.find({
            order: {
                id: "DESC"
              },
            take: 22,
        });
    }

    async getEvents(filter: Partial<GuardEvent>) {
        const queryBuilder = this.db.createQueryBuilder('GuardEvent');
        const example: GuardEvent = new GuardEvent();
        Object.entries(filter).forEach(([key, value]) => {
        if (value !== null && example.hasOwnProperty(key)) {
            if (String(value).includes('>')) {
            queryBuilder.andWhere(`TagDBEntity.${key} > :${key}`, { [key]: String(value).slice(1) });
            } else if (String(value).includes('<')) {
            queryBuilder.andWhere(`TagDBEntity.${key} < :${key}`, { [key]: String(value).slice(1) });
            } else {
            queryBuilder.andWhere(`TagDBEntity.${key} = :${key}`, { [key]: value });
            }
        } else {
            throw new BadRequestException('Bad Request Exception', {
            cause: new Error(),
            description: 'You tried to give me a null value or a nonexisting attribute!',
            });
        }
        });
        return await queryBuilder.getMany();
    }

    async getLog() {
        return this.frontend.asBeautifulTable(["Timestamp", "Type"], await this.getAllEvents());
    }


    @OnEvent('**', { async: true })
    async handleEvents(event: any) {
        // Does somehow not work :(
        console.log("Catched an Event!", event);
    }

    @OnEvent('button.pressed', { async: true })
    async handleBtnPressEvent(event: ButtonEvent) {
        //console.log("DB: button pressed");
        const ge = this.eventToEntity(event, "button.pressed");
        this.create(ge);
    }

    @OnEvent('button.rise', { async: true })
    async handleBtnRiseEvent(event: RiseEvent) {
        //console.log("DB: button rise");
        const ge = this.eventToEntity(event, "button.rise");
        this.create(ge);
    }

    @OnEvent('bell.ring', { async: true })
    async handleBellInternRingEvent(event: BellEvent) {
        //console.log("DB: bell ring");
        const ge = this.eventToEntity(event, "bell.ring");
        this.create(ge);
    }

    @OnEvent('door.open', { async: true })
    async handleDoorOpenEvent(event: DoorEvent) {
        //console.log("DB: door open");
        const ge = this.eventToEntity(event, "door.open");
        this.create(ge);
    }
}
