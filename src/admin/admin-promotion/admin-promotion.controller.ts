import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Delete,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AdminPromotionService } from './admin-promotion.service';
import { AdminPromotionDto } from './dto';
import { FirebaseGuard } from 'src/auth/guard';
import { ApiTags } from '@nestjs/swagger';

// @UseGuards(FirebaseGuard)
@Controller('admin/promotion')
@ApiTags('Admin Promotion')
export class AdminPromotionController {
  constructor(private adminPromotionService: AdminPromotionService) {}

  @Post('')
  addPromotion(@Body() dto: AdminPromotionDto) {
    return this.adminPromotionService.addPromotion(dto);
  }

  @Put(':promotionId')
  updatePromotion(
    @Param('promotionId') promotionId: string,
    @Body() dto: AdminPromotionDto,
  ) {
    return this.adminPromotionService.updatePromotion(promotionId, dto);
  }

  @Delete(':promotionId')
  deletePromotion(@Param('promotionId') promotionId: string) {
    return this.adminPromotionService.deletePromotion(promotionId);
  }

  @Get(':promotionId')
  getPromotion(@Param('promotionId') promotionId: string) {
    return this.adminPromotionService.getPromotion(promotionId);
  }

  @Get('')
  getPromotions() {
    return this.adminPromotionService.getPromotions();
  }
}
