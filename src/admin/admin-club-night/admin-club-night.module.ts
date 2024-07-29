import { Module } from '@nestjs/common';
import { AdminClubNightController } from './admin-club-night.controller';
import { AdminClubNightService } from './admin-club-night.service';

@Module({
  controllers: [AdminClubNightController],
  providers: [AdminClubNightService],
})
export class AdminClubNightModule {}
