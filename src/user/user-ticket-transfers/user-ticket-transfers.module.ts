import { Module } from '@nestjs/common';
import { UserTicketTransfersService } from './user-ticket-transfers.service';
import { UserTicketTransfersController } from './user-ticket-transfers.controller';
import { UserTicketsService } from '../user-tickets/user-tickets.service';
import { UserTicketsModule } from '../user-tickets/user-tickets.module';

@Module({
  providers: [UserTicketTransfersService, UserTicketsService],
  controllers: [UserTicketTransfersController],
})
export class UserTicketTransfersModule {}
