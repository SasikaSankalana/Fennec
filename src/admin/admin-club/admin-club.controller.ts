import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AdminClubDto } from './dto';
import { AdminClubService } from './admin-club.service';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('admin/club')
export class AdminClubController {
  constructor(private adminClubService: AdminClubService) {}

  @Post('/create')
  addClub(@Body() dto: AdminClubDto) {
    return this.adminClubService.addClub(dto);
  }

  @Put('/update/:id')
  updateClub(@Param('id') id: string, @Body() dto: AdminClubDto) {
    return this.adminClubService.updateClub(id, dto);
  }

  @Delete('delete/:id')
  deleteClub(@Param('id') id: string) {
    return this.adminClubService.deleteClub(id);
  }

  @Get('get/:id')
  getClub(@Param('id') id: string) {
    return this.adminClubService.getClub(id);
  }

  @Get('get')
  getClubs() {
    return this.adminClubService.getClubs();
  }
}
