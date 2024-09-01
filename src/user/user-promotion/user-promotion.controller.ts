import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserPromotionService } from './user-promotion.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('promotion')
@ApiTags('User Promotion')
export class UserPromotionController {
  constructor(private userPromotionService: UserPromotionService) {}

  @Get(':promotionId')
  getPromotion(@Param('promotionId') promotionId: string) {
    return this.userPromotionService.getPromotion(promotionId);
  }

  @Get('')
  getPromotions() {
    return this.userPromotionService.getPromotions();
  }

  @Get(':promotionId/points')
  getPoints(@Param('promotionId') promotionId: string) {
    return this.userPromotionService.getUserPoints(promotionId);
  }
}
