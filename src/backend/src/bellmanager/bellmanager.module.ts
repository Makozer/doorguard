// Zuständigkeit: M

import { Module } from '@nestjs/common';
import { BellManagerService } from './bellmanager.service';
import { BellManagerController } from './bellmanager.controller';
import { DoorService } from 'src/door/door.service';

@Module({
  providers: [BellManagerService],
  controllers: [BellManagerController]
})
export class BellManagerModule {}
