import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { ClubDto } from './dto';
import { ClubService } from './club.service';

@Controller('club')
export class ClubController {
  constructor(private clubService: ClubService) {}

  @Post('/create')
  addClub(@Body() dto: ClubDto) {
    return this.clubService.addClub(dto);
  }

  @Put('/update/:id')
  updateClub(@Param('id') id: string, @Body() dto: ClubDto) {
    return this.clubService.updateClub(id, dto);
  }
}
