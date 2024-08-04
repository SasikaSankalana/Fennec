import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserPromotionService } from './user-promotion.service';
import { RedeemPromotionDto } from './dto';
import { FirebaseGuard } from 'src/auth/guard';
import { ApiTags } from '@nestjs/swagger';

// @UseGuards(FirebaseGuard)
@Controller('promotion')
@ApiTags('User Promotion')
export class UserPromotionController {
  constructor(private userPromotionService: UserPromotionService) {}

  @Get(':promotionId')
  getPromotion(@Param('promotionId') promotionId: string) {
    return this.userPromotionService.getPromotion(promotionId);
  }

  @Get('club/:clubId')
  getPromotions(@Param('clubId') clubId: string) {
    return this.userPromotionService.getPromotions(clubId);
  }

  @Post('redeem')
  redeemPromotion(@Body() dto: RedeemPromotionDto) {
    return this.userPromotionService.redeemPromotion(dto);
  }

  @Get(':promotionId/points')
  getPoints(@Param('promotionId') promotionId: string) {
    return this.userPromotionService.getUserPoints(promotionId);
  }
}
