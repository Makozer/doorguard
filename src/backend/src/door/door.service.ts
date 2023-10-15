// Zuständigkeit: M

import { Injectable, Logger } from '@nestjs/common';
import { EventEmitterModule, OnEvent } from '@nestjs/event-emitter';
import { DoorEvent } from 'src/events/door.event';

@Injectable()
export class DoorService {
    private readonly logger = new Logger("Door");

    private doornr: number = 17;

    // Locker
    private unlockTime: Date;
    private lockTime: Date;

    constructor() {
         // Set Locks
         this.unlockTime = new Date();
         this.lockTime = new Date();
         this.unlockTime.setHours(6, 30);
         this.lockTime.setHours(22, 15);
    }

    openDoor(mseconds: number) {
        this.logger.log("Door opened");
        const Gpio = require('onoff').Gpio;
        const door = new Gpio(this.doornr, 'out'); 
        door.writeSync(1);
        setTimeout(_ => {
            door.writeSync(0);
            door.unexport(); 
        }, mseconds);
    }

    checkLock() {
        const now: Date = new Date();

        if (this.dateAsHMNr(now) > this.dateAsHMNr(this.unlockTime) 
            && this.dateAsHMNr(now) < this.dateAsHMNr(this.lockTime)) {
                return true;
        }
        return false;
    }

    dateAsHMNr(date: Date) {
        // Returns from a given Date just hours + minutes as numbers. example:  14:45  ->  14*60 + 45
        return ((date.getHours() * 60) + date.getMinutes());
    }
 
    @OnEvent('door.open')
    handleDoorOpenEvent(event: DoorEvent) {
        // Guard für die Zeiten in denen die Tür sich nicht öffnen soll
        if (!this.checkLock() && !event.ignoreLock) {
            this.logger.log("Door locked due to locktime");
            return;
        }

        // Tür wird geöffnet
        this.openDoor(4000);
    } 
}
