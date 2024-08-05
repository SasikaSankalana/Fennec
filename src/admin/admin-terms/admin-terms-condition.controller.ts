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

  @Post('')
  addTerm(@Body() dto: TermsAndConditionsDto) {
    return this.termsAndConditionsService.addTerm(dto);
  }

  @Put(':termsId')
  updateTerm(
    @Param('termsId') termsId: string,
    @Body() dto: TermsAndConditionsDto,
  ) {
    return this.termsAndConditionsService.updateTerm(termsId, dto);
  }

  @Get(':clubId')
  getTerms(@Param('clubId') clubId: string) {
    return this.termsAndConditionsService.getTerms(clubId);
  }
}
