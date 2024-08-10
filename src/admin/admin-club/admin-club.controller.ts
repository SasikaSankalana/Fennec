import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdminClubDto } from './dto';
import { AdminClubService } from './admin-club.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

@Controller('admin/club')
@ApiTags('Admin Club')
export class AdminClubController {
  constructor(private adminClubService: AdminClubService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('photoUrl'))
  addClub(
    @UploadedFile() photoUrl: MulterField,
    @Body('jsonBody') dto: AdminClubDto,
  ) {
    console.log(dto);

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
