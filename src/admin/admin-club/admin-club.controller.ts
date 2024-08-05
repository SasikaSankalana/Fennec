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
import { ApiTags } from '@nestjs/swagger';

@Controller('admin/club')
@ApiTags('Admin Club')
export class AdminClubController {
  constructor(private adminClubService: AdminClubService) {}

  @Post('')
  addClub(@Body() dto: AdminClubDto) {
    return this.adminClubService.addClub(dto);
  }

  @Put(':clubId')
  updateClub(@Param('clubId') clubId: string, @Body() dto: AdminClubDto) {
    return this.adminClubService.updateClub(clubId, dto);
  }

  @Delete(':clubId')
  deleteClub(@Param('id') clubId: string) {
    return this.adminClubService.deleteClub(clubId);
  }

  @Get(':clubId')
  getClub(@Param('clubId') clubId: string) {
    return this.adminClubService.getClub(clubId);
  }

  @Get('')
  getClubs() {
    return this.adminClubService.getClubs();
  }
}
