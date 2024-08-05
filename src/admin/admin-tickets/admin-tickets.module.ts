import { Module } from '@nestjs/common';
import { AdminTicketsService } from './admin-tickets.service';
import { AdminTicketsController } from './admin-tickets.controller';

@Module({
  providers: [AdminTicketsService],
  controllers: [AdminTicketsController]
})
export class AdminTicketsModule {}
