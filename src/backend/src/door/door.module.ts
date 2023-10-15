// Zuständigkeit: M

import { Module } from '@nestjs/common';
import { DoorService } from './door.service';

@Module({
  providers: [DoorService],
  //exports: [DoorService]
})
export class DoorModule {}
