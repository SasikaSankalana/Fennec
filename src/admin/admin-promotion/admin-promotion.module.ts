import { Module } from '@nestjs/common';
import { AdminPromotionController } from './admin-promotion.controller';
import { AdminPromotionService } from './admin-promotion.service';

@Module({
  controllers: [AdminPromotionController],
  providers: [AdminPromotionService]
})
export class AdminPromotionModule {}
