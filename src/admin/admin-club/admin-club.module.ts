import { Module } from '@nestjs/common';
import { AdminClubService } from './admin-club.service';
import { AdminClubController } from './admin-club.controller';

@Module({
  providers: [AdminClubService],
  controllers: [AdminClubController],
})
export class AdminClubModule {}
