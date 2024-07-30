import { Module } from '@nestjs/common';
import { UserClubNightController } from './user-club-night.controller';
import { UserClubNightService } from './user-club-night.service';

@Module({
  controllers: [UserClubNightController],
  providers: [UserClubNightService]
})
export class UserClubNightModule {}
