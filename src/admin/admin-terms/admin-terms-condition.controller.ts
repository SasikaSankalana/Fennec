import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminTermsConditionsService } from './admin-terms-conditions.service';
import { TermsAndConditionsDto } from './dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin/terms')
@ApiTags('Terms and Conditions')
export class AdminTermsConditionsController {
  constructor(private termsAndConditionsService: AdminTermsConditionsService) {}

  @Post(':clubId')
  addTerm(@Param('clubId') clubId: string, @Body() dto: TermsAndConditionsDto) {
    return this.termsAndConditionsService.addTerm(clubId, dto);
  }

  @Put(':clubId')
  updateTerm(
    @Param('clubId') clubId: string,
    @Body() dto: TermsAndConditionsDto,
  ) {
    return this.termsAndConditionsService.updateTerm(clubId, dto);
  }

  @Get(':clubId')
  getTerms(@Param('clubId') clubId: string) {
    return this.termsAndConditionsService.getTerms(clubId);
  }
}
