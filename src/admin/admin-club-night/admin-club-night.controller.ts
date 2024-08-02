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
import { AdminClubNightService } from './admin-club-night.service';
import { AdminClubNightDto } from './dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('admin/club-night')
export class AdminClubNightController {
  constructor(private adminClubNightService: AdminClubNightService) {}

  @Post('create')
  addClubNight(@Body() dto: AdminClubNightDto) {
    return this.adminClubNightService.addClubNight(dto);
  }

  @Put('update/:id')
  updateClubNight(@Param('id') id: string, @Body() dto: AdminClubNightDto) {
    return this.adminClubNightService.updateClubNight(id, dto);
  }

  @Delete('delete/:id')
  deleteClubNight(@Param('id') id: string) {
    return this.adminClubNightService.deleteClubNight(id);
  }

  @Get('get/:id')
  getClubNight(@Param('id') id: string) {
    return this.adminClubNightService.getClubNight(id);
  }

  @Get('get')
  getClubNights() {
    return this.adminClubNightService.getClubNights();
  }

  @Get('get/:id/location')
  getClubLocation(@Param('id') id: string) {
    return this.adminClubNightService.getClubLocation(id);
  }
}
