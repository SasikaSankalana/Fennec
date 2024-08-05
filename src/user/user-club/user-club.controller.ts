import { Controller, Param, Get, UseGuards } from '@nestjs/common';
import { UserClubService } from './user-club.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('club')
@ApiTags('User Club')
export class UserClubController {
  constructor(private userClubService: UserClubService) {}

  @Get(':clubId')
  getClub(@Param('clubId') clubId: string) {
    return this.userClubService.getClub(clubId);
  }

  @Get('')
  getClubs() {
    return this.userClubService.getClubs();
  }
}
