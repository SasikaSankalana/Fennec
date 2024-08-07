import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { FirebaseModule } from '../../firebase/firebase.module';

@Module({
  imports: [FirebaseModule],
  providers: [ImageService],
  controllers: [ImageController],
})
export class ImageModule {}
