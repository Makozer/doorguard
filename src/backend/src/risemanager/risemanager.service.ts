// Zuständigkeit: L
import { Injectable, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ButtonEvent } from 'src/events/button.event';
import { RiseEvent } from 'src/events/rise.event';

@Injectable()
export class RisemanagerService {
    private readonly logger = new Logger("RiseManager");

    private btnnr: number = 2; // GPIO Pin für KlingelKnopf unten

    private DEBOUNCE_TIME: number = 44; //longest delay between individual pulses (because the optocoupler uses AC)
    private MIN_RISES: number = 5; //button has to be pressed for min this amount of AC sinewaves, so we don't trigger on single pulses

    private rise: number = 0;

    private last_rise: Date = new Date();

    constructor(private events: EventEmitter2) {

        const Gpio = require('onoff').Gpio;
        let button = new Gpio(this.btnnr, 'in', 'rising');
        button.watch((err, value) => {

            const now: Date = new Date();

            if (now.getTime() - this.last_rise.getTime() > this.DEBOUNCE_TIME) {
                //if (this.rise < this.MIN_RISES) {
                    // Throw Alien Buzz Event
                    //this.raiseBtnRiseEvent();
                //}
                this.rise = 1;
            } else {
                this.rise += 1;
            }

            if (this.rise == this.MIN_RISES) {
                //console.log(new Date(), "The button was definetly pressed!");
                this.raiseBtnPressEvent();
            }
             
            this.last_rise = now;

            if(err != undefined) {console.log("err:", err);}
            //if(value != undefined) {console.log("value:", value);}
        });

        // Clean up ressources when program exits
        process.on('SIGINT', _ => {
            button.unexport();
        });
    }

    // raise Button Press Event
    raiseBtnRiseEvent() {
        this.logger.log('Rise ... someone opened the door');
        this.events.emit(
            'button.rise',
            new RiseEvent(this.last_rise),
        );
    }

    // raise Button Press Event
    raiseBtnPressEvent() {
        this.logger.log('Button pressed');
        this.events.emit(
            'button.pressed',
            new ButtonEvent(),
        );
        
    }
}
