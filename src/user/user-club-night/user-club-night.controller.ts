import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserClubNightService } from './user-club-night.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('club-night')
@ApiTags('User Club Night')
export class UserClubNightController {
  constructor(private userClubNightService: UserClubNightService) {}

  @Get('')
  getClubNights() {
    return this.userClubNightService.getClubNights();
  }

  @Get(':clubNightId')
  getClubNight(@Param('clubNightId') clubNightId: string) {
    return this.userClubNightService.getClubNight(clubNightId);
  }
}
