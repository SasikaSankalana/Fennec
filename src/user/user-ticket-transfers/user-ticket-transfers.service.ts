import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserTicketsService } from '../user-tickets/user-tickets.service';
import { TicketTransferDto } from './dto';

@Injectable()
export class UserTicketTransfersService {
  constructor(private userTicketsService: UserTicketsService) {}

  // async transferTicket(
  //   reservationId: string,
  //   dto: TicketTransferDto,
  //   isEvent: boolean,
  // ) {
  //   try {
  //     const existingReservation =
  //       await this.userTicketsService.getReservationDetails(
  //         reservationId,
  //         true,
  //       );

  //     if (!existingReservation) {
  //       throw new ForbiddenException('Reservation not found');
  //     }

  //     const ticketQty = await this.getNumberOfTickets(reservationId, isEvent);

  //     if (ticketQty < dto.ticketQty) {
  //       throw new ForbiddenException('Not enough tickets');
  //     }

  //     if (dto.friends.length == 1) {
  //       const friend = dto.friends[0];
  //     } else {
  //       if (ticketQty !== dto.ticketQty) {
  //         throw new ForbiddenException('Invalid ticket quantity');
  //       }
  //     }
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  async getNumberOfTickets(reservationId: string, isEvent: boolean) {
    const reservation = await this.userTicketsService.getReservationDetails(
      reservationId,
      isEvent,
    );

    const ticketQty = reservation.Ticket.length;

    return ticketQty;
  }
}
