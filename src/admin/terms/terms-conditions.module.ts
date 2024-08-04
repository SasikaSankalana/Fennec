import { Module } from '@nestjs/common';
import { TermsAndConditionsService } from './terms-conditions.service';
import { TermsController } from './terms-condition.controller';

@Module({
  providers: [TermsAndConditionsService],
  controllers: [TermsController],
})
export class TermsModule {}
