import { Module } from '@nestjs/common';
import { AdminTermsConditionsService } from './admin-terms-conditions.service';
import { AdminTermsConditionsController } from './admin-terms-condition.controller';

@Module({
  providers: [AdminTermsConditionsService],
  controllers: [AdminTermsConditionsController],
})
export class AdminTermsConditionsModule {}
