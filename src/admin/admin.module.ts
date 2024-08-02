import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminClubModule } from './admin-club/admin-club.module';
import { AdminClubNightModule } from './admin-club-night/admin-club-night.module';
import { AdminPromotionModule } from './admin-promotion/admin-promotion.module';

@Module({
  imports: [AdminClubModule, AdminClubNightModule, AdminPromotionModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
