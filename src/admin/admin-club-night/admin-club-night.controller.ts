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
import { FirebaseGuard } from 'src/auth/guard';
import { ApiTags } from '@nestjs/swagger';

// @UseGuards(FirebaseGuard)
@Controller('admin/club-night')
@ApiTags('Admin Club Night')
export class AdminClubNightController {
  constructor(private adminClubNightService: AdminClubNightService) {}

  @Post('')
  addClubNight(@Body() dto: AdminClubNightDto) {
    return this.adminClubNightService.addClubNight(dto);
  }

  @Put(':clubNightId')
  updateClubNight(
    @Param('clubNightId') clubNightId: string,
    @Body() dto: AdminClubNightDto,
  ) {
    return this.adminClubNightService.updateClubNight(clubNightId, dto);
  }

  @Delete(':clubNightId')
  deleteClubNight(@Param('clubNightId') clubNightId: string) {
    return this.adminClubNightService.deleteClubNight(clubNightId);
  }

  @Get(':clubNightId')
  getClubNight(@Param('clubNightId') clubNightId: string) {
    return this.adminClubNightService.getClubNight(clubNightId);
  }

  @Get('')
  getClubNights() {
    return this.adminClubNightService.getClubNights();
  }

  @Get(':clubNightId/location')
  getClubLocation(@Param('clubNightId') clubNightId: string) {
    return this.adminClubNightService.getClubLocation(clubNightId);
  }
}
