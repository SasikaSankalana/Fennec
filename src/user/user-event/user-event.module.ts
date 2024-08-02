import { Module } from '@nestjs/common';
import { UserEventService } from './user-event.service';
import { UserEventController } from './user-event.controller';

@Module({
  providers: [UserEventService],
  controllers: [UserEventController]
})
export class UserEventModule {}
