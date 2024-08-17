import { Module } from '@nestjs/common';
import { AdminClubNightController } from './admin-club-night.controller';
import { AdminClubNightService } from './admin-club-night.service';
import { ImageService } from 'src/image/image.service';
import { ImageModule } from 'src/image/image.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [ImageModule, FirebaseModule],
  controllers: [AdminClubNightController],
  providers: [AdminClubNightService, ImageService],
})
export class AdminClubNightModule {}
