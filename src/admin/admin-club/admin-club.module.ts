import { Module } from '@nestjs/common';
import { AdminClubService } from './admin-club.service';
import { AdminClubController } from './admin-club.controller';
import { ImageService } from 'src/image/image.service';
import { ImageModule } from 'src/image/image.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [ImageModule, FirebaseModule],
  providers: [AdminClubService, ImageService],
  controllers: [AdminClubController],
})
export class AdminClubModule {}
