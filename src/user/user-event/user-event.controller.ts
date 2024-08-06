import { Controller, Get, Param } from '@nestjs/common';
import { UserEventService } from './user-event.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('event')
@ApiTags('User Event')
export class UserEventController {
  constructor(private userEventService: UserEventService) {}

  @Get(':eventId')
  getEvent(@Param('eventId') eventId: string) {
    return this.userEventService.getEvent(eventId);
  }

  @Get('')
  getEvents() {
    return this.userEventService.getEvents();
  }
}
