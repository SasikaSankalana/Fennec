import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserEventService } from './user-event.service';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';
import { TicketSummaryDto } from '../user-tickets/dto';
import { UserTicketsService } from '../user-tickets/user-tickets.service';

@Controller('event')
@ApiTags('User Event')
export class UserEventController {
  constructor(
    private userEventService: UserEventService,
    private userService: UserService,
    private userTicketsService: UserTicketsService,
  ) {}

  @Get(':eventId/user/:userId')
  getEvent(@Param('eventId') eventId: string, @Param('userId') userId: string) {
    return this.userEventService.getEvent(eventId, userId);
  }

  @Get('')
  getEvents() {
    return this.userEventService.getEvents();
  }

  @Get(':eventId/participants')
  getEventParticipants(@Param('eventId') eventId: string) {
    return this.userService.getParticipants(eventId, true);
  }

  @Get(':eventId/tickets/tiers')
  async getTickets(@Param('eventId') eventId: string) {
    return this.userTicketsService.getTickets(eventId, true);
  }

  @Get(':eventId/tickets/addons')
  async getAddOns(@Param('eventId') eventId: string) {
    return this.userTicketsService.getAddOns(eventId, true);
  }

  @Post(':eventId/tickets/summary')
  async getTicketSummary(@Body() dto: TicketSummaryDto) {
    return this.userTicketsService.getTicketSummary(dto);
  }

  @Post(':eventId/tickets/reserve/:userId')
  async reserveTickets(
    @Body() dto: TicketSummaryDto,
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.userTicketsService.reserveTickets(dto, userId, eventId, true);
  }
}
