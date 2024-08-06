import { Module } from '@nestjs/common';
import { AdminEventService } from './admin-event.service';
import { AdminEventController } from './admin-event.controller';

@Module({
  providers: [AdminEventService],
  controllers: [AdminEventController]
})
export class AdminEventModule {}
