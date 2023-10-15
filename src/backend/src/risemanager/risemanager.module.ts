// Zuständigkeit: L
import { Module } from '@nestjs/common';
import { RisemanagerService } from './risemanager.service';

@Module({
  providers: [RisemanagerService]
})
export class RisemanagerModule {}
