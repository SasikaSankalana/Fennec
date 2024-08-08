import { Module } from '@nestjs/common';
import { UserTicketsService } from './user-tickets.service';
import { UserTicketsController } from './user-tickets.controller';

@Module({
  providers: [UserTicketsService],
  controllers: [UserTicketsController]
})
export class UserTicketsModule {}
