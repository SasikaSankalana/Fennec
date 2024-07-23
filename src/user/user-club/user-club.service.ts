import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserClubDto } from './dto';

@Injectable()
export class UserClubService {
  constructor(private prisma: PrismaService) {}
}
