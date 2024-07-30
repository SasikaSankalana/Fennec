import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserPromotionService } from './user-promotion.service';

@Controller('promotion')
export class UserPromotionController {
  constructor(private userPromotionService: UserPromotionService) {}

  @Get('get/:id')
  getPromotion(@Param('id') id: string) {
    return this.userPromotionService.getPromotion(id);
  }

  @Get('get')
  getPromotions() {
    return this.userPromotionService.getPromotions();
  }

  @Post('redeem')
  redeemPromotion(@Body() body: { userId: string; requiredPoints: number }) {
    return this.userPromotionService.redeemPromotion(
      body.userId,
      body.requiredPoints,
    );
  }

  @Get('get/:id/points')
  getPoints(@Param('id') id: string) {
    return this.userPromotionService.getUserPoints(id);
  }
}
