import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { UserClubDto } from './dto';
import { UserClubService } from './user-club.service';

@Controller('club')
export class UserClubController {
  constructor(private userClubService: UserClubService) {}
}
