import { Body, Controller, Param, Post } from '@nestjs/common';
import { AdminTicketsService } from './admin-tickets.service';
import { TicketAddOnsDto, TicketTiersDto } from './dto';

@Controller('admin/tickets')
export class AdminTicketsController {
  constructor(private adminTicketsService: AdminTicketsService) {}
  4;

  @Post(':functionId/tiers')
  createTicketTier(
    @Param('functionId') functionId: string,
    @Body() dto: TicketTiersDto,
  ) {
    return this.adminTicketsService.createTicketTier(dto, functionId);
  }

  @Post(':functionId/addons')
  createAddOn(
    @Param('functionId') functionId: string,
    @Body() dto: TicketAddOnsDto,
  ) {
    return this.adminTicketsService.createAddOn(dto, functionId);
  }
}
