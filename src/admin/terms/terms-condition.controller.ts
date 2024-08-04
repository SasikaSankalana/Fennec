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
