import { Module } from '@nestjs/common';
import { UserTermsConditionsService } from './user-terms-conditions.service';
import { UserTermsConditionsController } from './user-terms-conditions.controller';

@Module({
  providers: [UserTermsConditionsService],
  controllers: [UserTermsConditionsController]
})
export class UserTermsConditionsModule {}
