import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TermsAndConditionsService } from './terms-conditions.service';
import { TermsAndConditionsDto } from './dto';

@Controller('terms')
export class TermsController {
  constructor(private termsAndConditionsService: TermsAndConditionsService) {}

  @Post('create')
  addTerm(@Body() dto: TermsAndConditionsDto) {
    return this.termsAndConditionsService.addTerm(dto);
  }

  @Put('update/:id')
  updateTerm(@Param('id') id: string, @Body() dto: TermsAndConditionsDto) {
    return this.termsAndConditionsService.updateTerm(id, dto);
  }

  @Get('get:/id')
  getTerms(@Param('id') id: string) {
    return this.termsAndConditionsService.getTerms(id);
  }
}
