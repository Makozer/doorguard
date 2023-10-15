// Zuständigkeit: M

import { Injectable, Logger } from '@nestjs/common';
import { EventEmitterModule, EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { BellEvent } from 'src/events/bell.event';
import { ButtonEvent } from 'src/events/button.event';
import { DoorEvent } from 'src/events/door.event';


@Injectable()
export class BellManagerService {
    //private readonly logger = new Logger("DoorGuard");

    private btnevents: ButtonEvent[] = [];
    private bellTO; // Bell TimeOut
    private belllock: Date = new Date();

    private milliSecondsToOpenLock: number = 9999; // Wann die Klingel nicht mehr gelockt ist
    private milliSecondsToInternBellRing: number = 1666; // Zeit bis die Klingel aktiviert wird

    private btnPressToOpen: number = 3; // Wie oft man klingeln muss bis die Tür aufgeht

    constructor(private events: EventEmitter2) {}

    checkBtnEvents() {
        if (this.btnevents.length >= 1) {
            // Klingeldelay starten
            this.deleteBellTimeOut();
            this.setBellTimeOut();
        }
        if (this.btnevents.length >= this.btnPressToOpen) {
            this.events.emit(
                'door.open',
                new DoorEvent(),
            );
        }
    }

    setLock() {
        this.belllock = new Date();
    }

    checkLock() {
        const now: number = new Date().getTime();
        const lock: number = this.belllock.getTime();
        var delta: number = now - lock;
        if (delta > this.milliSecondsToOpenLock) {
            return true;
        } else {
            return false;
        }
    }

    setBellTimeOut() {
        this.bellTO = setTimeout(() => {
            if (this.checkLock()) {
                this.events.emit(
                    'bell.ring',
                    new BellEvent(),
                  );
            } else {
                this.deleteBtnEvents();
            }
        }, this.milliSecondsToInternBellRing);
    }

    deleteBellTimeOut() {
        clearTimeout(this.bellTO);
    }

    deleteBtnEvents() {
        this.btnevents.length = 0;
    }

    raiseDoorOpenEvent() {
        this.events.emit(
            'door.open',
            new DoorEvent(true),
        );
    }

    @OnEvent('button.pressed')
    handleBtnPressEvent(event: ButtonEvent) {
        this.btnevents.push(event);
        this.checkBtnEvents();
    }

    @OnEvent('bell.ring')
    handleBellInternRingEvent(event: BellEvent) {
        this.deleteBtnEvents();
        this.setLock();
    }

    @OnEvent('door.open')
    handleDoorOpenEvent(event: DoorEvent) {
        this.deleteBtnEvents();
        this.setLock();
        this.deleteBellTimeOut();
    }
}

