import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserClubNightService } from './user-club-night.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('club-night')
@ApiTags('User Club Night')
export class UserClubNightController {
  constructor(private userClubNightService: UserClubNightService) {}

  @Get('past')
  getPastClubNights() {
    return this.userClubNightService.getPastClubNights();
  }

  @Get('upcoming')
  getUpcomingClubNights() {
    return this.userClubNightService.getUpcomingClubNights();
  }

  @Get(':clubNightId')
  getClubNight(@Param('clubNightId') clubNightId: string) {
    return this.userClubNightService.getClubNight(clubNightId);
  }

  @Get('')
  getClubNights() {
    return this.userClubNightService.getClubNights();
  }
}
