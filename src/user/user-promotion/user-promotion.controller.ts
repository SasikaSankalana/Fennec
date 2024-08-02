import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserPromotionService } from './user-promotion.service';
import { RedeemPromotionDto } from './dto';

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
  redeemPromotion(@Body() dto: RedeemPromotionDto) {
    return this.userPromotionService.redeemPromotion(dto);
  }

  @Get('get/:id/points')
  getPoints(@Param('id') id: string) {
    return this.userPromotionService.getUserPoints(id);
  }
}
