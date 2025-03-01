import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminEventService } from './admin-event.service';
import { AdminEventDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { TicketAddOnsDto, TicketTiersDto } from '../admin-tickets/dto';
import { AdminTicketsService } from '../admin-tickets/admin-tickets.service';

@Controller('admin/event')
@ApiTags('Admin Event')
export class AdminEventController {
  constructor(
    private adminEventService: AdminEventService,
    private adminTicketsService: AdminTicketsService,
  ) {}

  @Post('')
  addEvent(@Body() dto: AdminEventDto) {
    return this.adminEventService.addEvent(dto);
  }

  @Put(':eventId')
  updateEvent(@Param('eventId') eventId: string, @Body() dto: AdminEventDto) {
    return this.adminEventService.updateEvent(eventId, dto);
  }

  @Delete(':eventId')
  deleteEvent(@Param('eventId') eventId: string) {
    return this.adminEventService.deleteEvent(eventId);
  }

  @Get(':eventId')
  getEvent(@Param('eventId') eventId: string) {
    return this.adminEventService.getEvent(eventId);
  }

  @Get('')
  getEvents() {
    return this.adminEventService.getEvents();
  }

  @Get(':eventId/location')
  getClubLocation(@Param('eventId') eventId: string) {
    return this.adminEventService.getClubLocation(eventId);
  }

  @Post(':eventId/tickets/tiers')
  createTicketTier(
    @Param('eventId') eventId: string,
    @Body() dto: TicketTiersDto,
  ) {
    return this.adminTicketsService.createTicketTier(dto, eventId, true);
  }

  @Post(':eventId/tickets/addons')
  createAddOn(@Param('eventId') eventId: string, @Body() dto: TicketAddOnsDto) {
    return this.adminTicketsService.createAddOn(dto, eventId, true);
  }
}
