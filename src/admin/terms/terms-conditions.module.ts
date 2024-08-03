import { Module } from '@nestjs/common';
import { TermsService } from './terms-conditions.service';
import { TermsController } from './terms-condition.controller';

@Module({
  providers: [TermsService],
  controllers: [TermsController],
})
export class TermsModule {}
