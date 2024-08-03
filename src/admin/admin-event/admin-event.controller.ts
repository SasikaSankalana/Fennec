import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AdminEventService } from './admin-event.service';
import { AdminEventDto } from './dto';

@Controller('admin/event')
export class AdminEventController {
  constructor(private adminEventService: AdminEventService) {}

  @Post('create')
  addEvent(@Body() dto: AdminEventDto) {
    return this.adminEventService.addEvent(dto);
  }

  @Put('update/:id')
  updateEvent(@Param('id') id: string, @Body() dto: AdminEventDto) {
    return this.adminEventService.updateEvent(id, dto);
  }

  @Delete('delete/:id')
  deleteEvent(@Param('id') id: string) {
    return this.adminEventService.deleteEvent(id);
  }

  @Get('get/:id')
  getEvent(@Param('id') id: string) {
    return this.adminEventService.getEvent(id);
  }

  @Get('get')
  getEvents() {
    return this.adminEventService.getEvents();
  }

  @Get('get/:id/location')
  getClubLocation(@Param('id') id: string) {
    return this.adminEventService.getClubLocation(id);
  }
}
