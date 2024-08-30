import { Module } from '@nestjs/common';
import { AdminEventService } from './admin-event.service';
import { AdminEventController } from './admin-event.controller';
import { ImageService } from 'src/image/image.service';
import { ImageModule } from 'src/image/image.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { AdminTicketsService } from '../admin-tickets/admin-tickets.service';

@Module({
  imports: [ImageModule, FirebaseModule],
  providers: [AdminEventService, ImageService, AdminTicketsService],
  controllers: [AdminEventController],
})
export class AdminEventModule {}
