import { Controller, Param, Get, UseGuards, Body, Post } from '@nestjs/common';
import { UserClubService } from './user-club.service';
import { ApiTags } from '@nestjs/swagger';
import { RedeemPromotionDto } from '../user-promotion/dto';

@Controller('club')
@ApiTags('User Club')
export class UserClubController {
  constructor(private userClubService: UserClubService) {}

  @Get(':clubId')
  getClub(@Param('clubId') clubId: string) {
    return this.userClubService.getClub(clubId);
  }

  @Get('/user/:userId')
  getClubs(@Param('userId') userId: string) {
    return this.userClubService.getClubs(userId);
  }

  @Get(':clubId/club-nights/upcoming')
  getUpcomingClubNights(@Param('clubId') clubId: string) {
    return this.userClubService.getUpcomingClubNights(clubId);
  }

  @Get(':clubId/events/upcoming')
  getUpcomingEvents(@Param('clubId') clubId: string) {
    return this.userClubService.getUpcomingEvents(clubId);
  }

  @Get(':clubId/promotion')
  getClubPromotion(@Param('clubId') clubId: string) {
    return this.userClubService.getClubPromotion(clubId);
  }

  @Post(':clubId/promotion/:promotionId/redeem')
  redeemPromotion(
    @Param('clubId') clubId: string,
    @Param('promotionId') promotionId: string,
    @Body() dto: RedeemPromotionDto,
  ) {
    return this.userClubService.redeemClubPromotion(clubId, promotionId, dto);
  }
}
