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
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('admin/promotion')
export class AdminPromotionController {
  constructor(private adminPromotionService: AdminPromotionService) {}

  @Post('create')
  addPromotion(@Body() dto: AdminPromotionDto) {
    return this.adminPromotionService.addPromotion(dto);
  }

  @Put('update/:id')
  updatePromotion(@Param('id') id: string, @Body() dto: AdminPromotionDto) {
    return this.adminPromotionService.updatePromotion(id, dto);
  }

  @Delete('delete/:id')
  deletePromotion(@Param('id') id: string) {
    return this.adminPromotionService.deletePromotion(id);
  }

  @Get('get/:id')
  getPromotion(@Param('id') id: string) {
    return this.adminPromotionService.getPromotion(id);
  }

  @Get('get')
  getPromotions() {
    return this.adminPromotionService.getPromotions();
  }
}
