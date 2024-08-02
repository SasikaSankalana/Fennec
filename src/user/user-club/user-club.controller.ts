import { Controller, Param, Get, UseGuards } from '@nestjs/common';
import { UserClubService } from './user-club.service';
import { FirebaseGuard } from 'src/auth/guard';

@UseGuards(FirebaseGuard)
@Controller('club')
export class UserClubController {
  constructor(private userClubService: UserClubService) {}

  @Get('get/:id')
  getClub(@Param('id') id: string) {
    return this.userClubService.getClub(id);
  }

  @Get('get')
  getClubs() {
    return this.userClubService.getClubs();
  }
}
