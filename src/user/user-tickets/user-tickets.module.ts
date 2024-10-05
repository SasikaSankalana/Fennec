import { Module } from '@nestjs/common';
import { UserTicketsService } from './user-tickets.service';
import { UserTicketsController } from './user-tickets.controller';
import { UserTicketTransfersModule } from '../user-ticket-transfers/user-ticket-transfers.module';
import { UserTicketTransfersService } from '../user-ticket-transfers/user-ticket-transfers.service';

@Module({
  imports: [UserTicketTransfersModule],
  providers: [UserTicketsService, UserTicketTransfersService],
  controllers: [UserTicketsController],
})
export class UserTicketsModule {}
