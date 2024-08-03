import { Controller, Get, Param } from '@nestjs/common';
import { UserEventService } from './user-event.service';

@Controller('event')
export class UserEventController {
  constructor(private userEventService: UserEventService) {}

  @Get('get/:id')
  getEvent(@Param('id') id: string) {
    return this.userEventService.getEvent(id);
  }

  @Get('get')
  getEvents() {
    return this.userEventService.getEvents();
  }

  @Get('past/get')
  getPastEvents() {
    return this.userEventService.getPastEvents();
  }

  @Get('upcoming/get')
  getUpcomingEvents() {
    return this.userEventService.getUpcomingEvents();
  }
}
