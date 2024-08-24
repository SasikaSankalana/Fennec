import { Controller, Delete, Get, Param } from '@nestjs/common';
import { UserFriendsService } from './user-friends.service';

@Controller('friends')
export class UserFriendsController {
  constructor(private userFriendsService: UserFriendsService) {}

  @Get(':userId')
  getUserFriends(@Param('userId') userId: string) {
    return this.userFriendsService.getFriends(userId);
  }
}
