import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserClubNightService } from './user-club-night.service';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from '../user.service';
import { TicketSummaryDto } from '../user-tickets/dto';
import { User } from '@prisma/client';
import { UserTicketsService } from '../user-tickets/user-tickets.service';

@Controller('club-night')
@ApiTags('User Club Night')
export class UserClubNightController {
  constructor(
    private userClubNightService: UserClubNightService,
    private userService: UserService,
    private userTicketsService: UserTicketsService,
  ) {}

  @Get('')
  getClubNights() {
    return this.userClubNightService.getClubNights();
  }

  @Get(':clubNightId/user/:userId')
  getClubNight(
    @Param('clubNightId') clubNightId: string,
    @Param('userId') userId: string,
  ) {
    return this.userClubNightService.getClubNight(clubNightId, userId);
  }

  @Get(':clubNightId/participants')
  getEventParticipants(@Param('clubNightId') clubNightId: string) {
    return this.userService.getParticipants(clubNightId, false);
  }

  @Get(':clubNightId/tickets/tiers')
  async getTickets(@Param('clubNightId') clubNightId: string) {
    return this.userTicketsService.getTickets(clubNightId, true);
  }

  @Get(':clubNightId/tickets/addons')
  async getAddOns(@Param('clubNightId') clubNightId: string) {
    return this.userTicketsService.getAddOns(clubNightId, true);
  }

  @Post(':clubNightId/tickets/summary')
  async getTicketSummary(@Body() dto: TicketSummaryDto) {
    return this.userTicketsService.getTicketSummary(dto);
  }

  @Post(':clubNightId/tickets/reserve/:userId')
  async reserveTickets(
    @Body() dto: TicketSummaryDto,
    @Param('userId') userId: string,
    @Param('clubNightId') clubNightId: string,
  ) {
    return this.userTicketsService.reserveTickets(
      dto,
      userId,
      clubNightId,
      false,
    );
  }
}
