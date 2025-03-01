import { Module } from '@nestjs/common';
import { UserPromotionService } from './user-promotion.service';
import { UserPromotionController } from './user-promotion.controller';

@Module({
  providers: [UserPromotionService],
  controllers: [UserPromotionController]
})
export class UserPromotionModule {}
