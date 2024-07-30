import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserClubController } from './user-club/user-club.controller';
import { UserClubModule } from './user-club/user-club.module';
import { UserPromotionModule } from './user-promotion/user-promotion.module';
import { UserClubNightModule } from './user-club-night/user-club-night.module';

@Module({
  imports: [UserClubModule, UserPromotionModule, UserClubNightModule],
  controllers: [UserController, UserClubController],
  providers: [UserService, PrismaService],
})
export class UserModule {}
