import { Module } from '@nestjs/common';
import { UserClubController } from './user-club.controller';
import { UserClubService } from './user-club.service';

@Module({
  controllers: [UserClubController],
  providers: [UserClubService],
  exports: [UserClubService],
})
export class UserClubModule {}
