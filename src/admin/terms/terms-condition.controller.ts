import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TermsAndConditionsService } from './terms-conditions.service';
import { TermsAndConditionsDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseGuard } from 'src/auth/guard';

@UseGuards(FirebaseGuard)
@Controller('terms')
@ApiTags('Terms and Conditions')
export class TermsController {
  constructor(private termsAndConditionsService: TermsAndConditionsService) {}

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

  @Get('clubId')
  getTerms(@Param('clubId') clubId: string) {
    return this.termsAndConditionsService.getTerms(clubId);
  }
}
