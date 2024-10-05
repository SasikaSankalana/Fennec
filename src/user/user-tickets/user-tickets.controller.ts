import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserTicketsService } from './user-tickets.service';
import { TicketSummaryDto } from './dto';
import { UserTicketTransfersService } from '../user-ticket-transfers/user-ticket-transfers.service';

@Controller('tickets')
export class UserTicketsController {
  constructor(
    private userTicketsService: UserTicketsService,
    private userTicketTransfersService: UserTicketTransfersService,
  ) {}

  @Get('/:reservationId/event')
  getEventReservationDetails(@Param('userId') userId: string) {
    return this.userTicketsService.getReservationDetails(userId, true);
  }

  @Get('/:reservationId/club-night')
  getClubNightReservationDetails(@Param('userId') userId: string) {
    return this.userTicketsService.getReservationDetails(userId, true);
  }

  @Get('/:reservationId/event/quantity')
  getNumberOfEventTickets(@Param('reservationId') reservationId: string) {
    return this.userTicketTransfersService.getNumberOfTickets(
      reservationId,
      true,
    );
  }

  @Get('/:reservationId/club-night/quantity')
  getNumberOfClubNightTickets(@Param('reservationId') reservationId: string) {
    return this.userTicketTransfersService.getNumberOfTickets(
      reservationId,
      false,
    );
  }

  // @Get('/:functionId/tiers')
  // async getTickets(@Param('functionId') functionId: string) {
  //   return this.userTicketsService.getTickets(functionId);
  // }

  // @Get(':functionId/addons')
  // async getAddOns(@Param('functionId') functionId: string) {
  //   return this.userTicketsService.getAddOns(functionId);
  // }

  // @Post('summary')
  // async getTicketSummary(@Body() dto: TicketSummaryDto) {
  //   return this.userTicketsService.getTicketSummary(dto, true);
  // }

  // @Post('reserve/:userId')
  // async reserveTickets(
  //   @Body() dto: TicketSummaryDto,
  //   @Param('userId') userId: string,
  // ) {
  //   return this.userTicketsService.reserveTickets(dto, userId);
  // }
}
