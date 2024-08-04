import { Controller, Param, Get, UseGuards } from '@nestjs/common';
import { UserClubService } from './user-club.service';
import { FirebaseGuard } from 'src/auth/guard';
import { ApiTags } from '@nestjs/swagger';

// @UseGuards(FirebaseGuard)
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
