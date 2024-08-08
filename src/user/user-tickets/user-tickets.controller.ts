import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserTicketsService } from './user-tickets.service';
import { TicketSummaryDto } from './dto';

@Controller('tickets')
export class UserTicketsController {
  constructor(private userTicketsService: UserTicketsService) {}

  @Get('/:functionId/tiers')
  async getTickets(@Param('functionId') functionId: string) {
    return this.userTicketsService.getTickets(functionId);
  }

  @Get(':functionId/addons')
  async getAddOns(@Param('functionId') functionId: string) {
    return this.userTicketsService.getAddOns(functionId);
  }

  @Post('summary')
  async getTicketSummary(@Body() dto: TicketSummaryDto) {
    return this.userTicketsService.getTicketSummary(dto);
  }
}
