// Zuständigkeit: M

import { Module } from '@nestjs/common';
import { DatabaseController } from './database.controller';
import { DatabaseService } from './database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GuardEvent } from './entitys/guardevent.entity';
import { FrontendService } from 'src/frontend/frontend.service';

@Module({
  imports: [TypeOrmModule.forFeature([GuardEvent])],
  controllers: [DatabaseController],
  providers: [DatabaseService, FrontendService]
})
export class DatabaseModule {}
