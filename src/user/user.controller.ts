import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  locationDto,
  OnboardDto,
  paymentDetailsDto,
  UserDto,
  userSettingsDto,
} from './dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { photoDto } from './user-club/dto/photo.dto';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { UserTicketsService } from './user-tickets/user-tickets.service';
import { UserFriendsService } from './user-friends/user-friends.service';

@Controller('users')
@ApiTags('Users')
export class UserController {
  constructor(
    private userService: UserService,
    private userTicketsService: UserTicketsService,
    private userFriendsService: UserFriendsService,
  ) {}

  @Post(':userId/club/:clubId/points')
  addPoints(
    @Param('userId') userId: string,
    @Param('clubId') clubId: string,
    @Body('points') points: number,
  ) {
    return this.userService.addPoints(userId, clubId, points);
  }

  @Post(':userId/onboarding')
  Onboarding(@Param('userId') userId: string, @Body() dto: OnboardDto) {
    return this.userService.Onboarding(userId, dto);
  }

  @Post(':userId/payment-details')
  addPayment(@Param('userId') userId: string, @Body() dto: paymentDetailsDto) {
    return this.userService.addPayment(userId, dto);
  }

  @Post(':userId/location')
  addLocation(@Param('userId') userId: string, @Body() dto: locationDto) {
    return this.userService.addLocation(userId, dto);
  }

  @Put(':userId/telephone')
  updateTelephoneNumber(@Param('userId') userId: string, telephone: string) {
    return this.updateTelephoneNumber(userId, telephone);
  }

  @Put(':userId')
  updateUser(@Param('userId') userId: string, @Body() dto: UserDto) {
    return this.userService.updateUser(userId, dto);
  }

  @Put(':userId/settings')
  updateUserSettings(
    @Param('userId') userId: string,
    @Body() dto: userSettingsDto,
  ) {
    return this.userService.updateUserSettings(userId, dto);
  }

  @Get(':userId/settings')
  getUserSettings(@Param('userId') userId: string) {
    return this.userService.getUserSettings(userId);
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this.userService.getUser(userId);
  }

  @Put(':userId/photo')
  @UseInterceptors(FileInterceptor('file'))
  updateUserPhoto(
    @Param('userId') userId: string,
    @UploadedFile() file: MulterField,
  ) {
    return this.userService.updateUserPhoto(userId, file);
  }

  getPaymentDetials(@Param('userId') userId: string) {
    return this.userService.getPaymentDetails(userId);
  }

  @Delete(':userId/photo')
  deleteUserPhoto(@Param('userId') userId: string) {
    return this.userService.deleteUserPhoto(userId);
  }

  @Get('/:userId/tickets')
  getUserReservations(@Param('userId') userId: string) {
    return this.userTicketsService.getUserReservations(userId);
  }

  @Get(':userId/list')
  getUsers(@Param('userId') userId: string) {
    return this.userService.getUsers(userId);
  }

  @Get(':userId/friends/:friendId')
  getFriend(
    @Param('friendId') friendId: string,
    @Param('userId') userId: string,
  ) {
    return this.userFriendsService.getFriend(userId, friendId);
  }

  @Post(':userId/friends/:friendId')
  createFriendRequest(
    @Param('friendId') friendId: string,
    @Param('userId') userId: string,
  ) {
    return this.userFriendsService.createFriendRequest(userId, friendId);
  }

  @Post('requests/:requestId/accept')
  acceptFriendRequest(@Param('requestId') requestId: string, @Body() dto: any) {
    return this.userFriendsService.acceptFriendRequest(requestId, dto);
  }

  @Delete('requests/:requestId/delete')
  deleteFriendRequest(@Param('requestId') requestId: string) {
    return this.userFriendsService.deleteFriendRequest(requestId);
  }

  @Get(':userId/requests')
  getFriendRequests(@Param('userId') userId: string) {
    return this.userFriendsService.getFriendRequests(userId);
  }

  @Delete('requests/:requestId/reject')
  rejectFriendRequest(@Param('requestId') requestId: string) {
    return this.userFriendsService.deleteFriendRequest(requestId);
  }

  @Get(':userId/friends')
  getUserFriends(@Param('userId') userId: string) {
    return this.userFriendsService.getFriends(userId);
  }
}
