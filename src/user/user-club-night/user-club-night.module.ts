import { Module } from '@nestjs/common';
import { UserClubNightController } from './user-club-night.controller';
import { UserClubNightService } from './user-club-night.service';
import { UserService } from '../user.service';
import { UserTicketsService } from '../user-tickets/user-tickets.service';
import { ImageService } from 'src/image/image.service';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  controllers: [UserClubNightController],
  providers: [
    UserClubNightService,
    UserService,
    UserTicketsService,
    ImageService,
  ],
})
export class UserClubNightModule {}
