import { Module } from '@nestjs/common';
import { UserTicketTransfersService } from './user-ticket-transfers.service';
import { UserTicketTransfersController } from './user-ticket-transfers.controller';

@Module({
  providers: [UserTicketTransfersService],
  controllers: [UserTicketTransfersController]
})
export class UserTicketTransfersModule {}
