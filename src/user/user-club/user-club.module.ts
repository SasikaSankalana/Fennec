import { Module } from '@nestjs/common';
import { UserClubController } from './user-club.controller';
import { UserClubService } from './user-club.service';
import { UserClubNightModule } from '../user-club-night/user-club-night.module';
import { UserClubNightService } from '../user-club-night/user-club-night.service';
import { UserEventService } from '../user-event/user-event.service';
import { UserPromotionService } from '../user-promotion/user-promotion.service';

@Module({
  controllers: [UserClubController],
  providers: [
    UserClubService,
    UserClubNightService,
    UserEventService,
    UserPromotionService,
  ],
  exports: [UserClubService],
})
export class UserClubModule {}
