import { Module } from '@nestjs/common';
import { AdminEventService } from './admin-event.service';
import { AdminEventController } from './admin-event.controller';
import { ImageService } from 'src/image/image.service';
import { ImageModule } from 'src/image/image.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [ImageModule, FirebaseModule],
  providers: [AdminEventService, ImageService],
  controllers: [AdminEventController],
})
export class AdminEventModule {}
