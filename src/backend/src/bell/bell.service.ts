// Zuständigkeit: M

import { Injectable, Logger } from '@nestjs/common';
import { EventEmitterModule, OnEvent } from '@nestjs/event-emitter';
import { BellEvent } from 'src/events/bell.event';

@Injectable()
export class BellService {
    private readonly logger = new Logger("Bell");
    private bellnr: number = 4; // GPIO für Klingel
    private ringBellMs: number = 2000; // Wie lange die Klingel klingeln soll.

    // Locker
    private unlockTime: Date;
    private lockTime: Date;

    constructor() {
        // Locktimes
        this.unlockTime = new Date();
        this.lockTime = new Date();
        this.unlockTime.setHours(6, 30);
        this.lockTime.setHours(23, 55);
    }

    checkLock() {
        const now: Date = new Date();

        if (this.dateAsHMNr(now) > this.dateAsHMNr(this.unlockTime) 
            && this.dateAsHMNr(now) < this.dateAsHMNr(this.lockTime)) {
                return true;
        }
        return false;
    }

    ringBell() {
        // Klingel läuten lassen
        const Gpio = require('onoff').Gpio;
        const bell = new Gpio(this.bellnr, 'out'); 
        const ringing = setInterval(_ => {
            bell.writeSync(bell.readSync() ^ 1);
        }, 500);
        setTimeout(_ => {
            clearInterval(ringing);
            bell.writeSync(0);
            bell.unexport(); 
        }, this.ringBellMs);
    }

    dateAsHMNr(date: Date) {
        // Returns from a given Date just hours + minutes as numbers. example:  14:45  ->  14*60 + 45
        return ((date.getHours() * 60) + date.getMinutes());
    }

    @OnEvent('bell.ring')
    handleBellRingEvent(event: BellEvent) {
        if (!this.checkLock()) {
            this.logger.log(" Bell locked due to locktime");
            return;
        }
        this.logger.log("Bell rings");
        this.ringBell();
    }
}
