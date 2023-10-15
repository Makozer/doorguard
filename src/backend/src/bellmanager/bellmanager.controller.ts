// Zuständigkeit: M

import { Controller, Get } from '@nestjs/common';
import { BellManagerService } from './bellmanager.service';
import { DoorService } from 'src/door/door.service';

@Controller('bellmanager')
export class BellManagerController {
    constructor(private service: BellManagerService) {}

    /*
    @Get("/btnpress")
    mockBtnPress() {
        this.service.throwBtnPressEvent();
    }
    */

    @Get("/opendoor")
    openDoor() {
        this.service.raiseDoorOpenEvent();
    }

    @Get("/printtime")
    printTime() {
        const now = new Date();
        const unlockTime = new Date();
        const lockTime = new Date();

        unlockTime.setHours(6, 30);
        lockTime.setHours(22, 0);
        console.log("now:", now, "; unlock:", unlockTime, "; lock:", lockTime);
        console.log("now > unlock", now > unlockTime);
        console.log("now < lockTime", now < lockTime);
        let test: string = "";
        test += now.getHours();
        test += now.getMinutes();
        console.log(test);
    }
}
