import { Controller, Get, Param } from '@nestjs/common';
import { UserEventService } from './user-event.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('event')
@ApiTags('User Event')
export class UserEventController {
  constructor(private userEventService: UserEventService) {}

  @Get('past')
  getPastEvents() {
    return this.userEventService.getPastEvents();
  }

  @Get(':id')
  getEvent(@Param('id') id: string) {
    return this.userEventService.getEvent(id);
  }

  @Get('')
  getEvents() {
    return this.userEventService.getEvents();
  }
}
