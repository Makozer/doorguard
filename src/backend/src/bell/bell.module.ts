// Zuständigkeit: M

import { Module } from '@nestjs/common';
import { BellService } from './bell.service';

@Module({
  providers: [BellService]
})
export class BellModule {}
