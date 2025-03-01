import { Controller, Get, Param } from '@nestjs/common';
import { UserTermsConditionsService } from './user-terms-conditions.service';

@Controller('terms')
export class UserTermsConditionsController {
  constructor(private termsAndConditionsService: UserTermsConditionsService) {}

  @Get(':clubId')
  getTerms(@Param('clubId') clubId: string) {
    return this.termsAndConditionsService.getTerms(clubId);
  }
}
