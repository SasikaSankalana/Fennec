import { Module } from '@nestjs/common';
import { UserEventService } from './user-event.service';
import { UserEventController } from './user-event.controller';
import { UserService } from '../user.service';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { ImageService } from 'src/image/image.service';
import { UserTicketsService } from '../user-tickets/user-tickets.service';

@Module({
  imports: [FirebaseModule],
  providers: [UserEventService, UserService, UserTicketsService, ImageService],
  controllers: [UserEventController],
})
export class UserEventModule {}
