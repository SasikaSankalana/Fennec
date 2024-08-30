import { Module } from '@nestjs/common';
import { UserFriendsService } from './user-friends.service';
import { UserFriendsController } from './user-friends.controller';

@Module({
  providers: [UserFriendsService],
  controllers: [UserFriendsController]
})
export class UserFriendsModule {}
