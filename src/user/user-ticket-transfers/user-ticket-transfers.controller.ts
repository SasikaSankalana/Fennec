import { Controller, Get, Param } from '@nestjs/common';
import { UserTicketTransfersService } from './user-ticket-transfers.service';

@Controller('ticket-transfers')
export class UserTicketTransfersController {
  constructor(private userTicketTransfersService: UserTicketTransfersService) {}

  getNumberOfTickets(@Param('reservationId') reservationId: string) {
    return this.userTicketTransfersService.getNumberOfTickets(
      reservationId,
      true,
    );
  }
}
