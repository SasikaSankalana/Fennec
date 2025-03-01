import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserClubController } from './user-club/user-club.controller';
import { UserClubModule } from './user-club/user-club.module';
import { UserPromotionModule } from './user-promotion/user-promotion.module';
import { UserClubNightModule } from './user-club-night/user-club-night.module';
import { UserEventModule } from './user-event/user-event.module';
import { UserTermsConditionsModule } from './user-terms-conditions/user-terms-conditions.module';
import { FirebaseModule } from '../firebase/firebase.module';
import { ImageModule } from '../image/image.module';
import { ImageService } from '../image/image.service';
import { UserTicketsModule } from './user-tickets/user-tickets.module';
import { UserReviewsController } from './user-reviews/user-reviews.controller';
import { UserReviewsModule } from './user-reviews/user-reviews.module';

@Module({
  imports: [
    UserClubModule,
    UserPromotionModule,
    UserClubNightModule,
    UserEventModule,
    UserTermsConditionsModule,
    ImageModule,
    FirebaseModule,
    UserTicketsModule,
    UserReviewsModule,
  ],
  controllers: [UserController, UserClubController, UserReviewsController],
  providers: [UserService, PrismaService, ImageService],
})
export class UserModule {}
