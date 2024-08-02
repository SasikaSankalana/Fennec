import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UserClubNightService } from './user-club-night.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('club-night')
export class UserClubNightController {
  constructor(private userClubNightService: UserClubNightService) {}

  @Get('get/:id')
  getClubNight(@Param('id') id: string) {
    return this.userClubNightService.getClubNight(id);
  }

  @Get('get')
  getClubNights() {
    return this.userClubNightService.getClubNights();
  }
}
