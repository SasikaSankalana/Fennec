import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Injectable()
export class ImageService {
  constructor(
    private readonly firebaseModule: FirebaseModule,
    private configService: ConfigService,
  ) {}

  async uploadImage(file): Promise<string> {
    const storage = this.firebaseModule.getStorageInstance();
    const bucket = storage.bucket();

    const fileName = `${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });

      stream.on('finish', () => {
        resolve(
          `https://firebasestorage.googleapis.com/v0/b/${this.configService.get(
            'FIREBASE_STORAGE_BUCKET',
          )}/o/${encodeURI(fileName)}?alt=media`,
        );
      });

      stream.end(file.buffer);
    });
  }

  async deleteImage(imageUrl: string): Promise<void> {
    const storage = this.firebaseModule.getStorageInstance();
    const bucket = storage.bucket();

    console.log('Image URL:', imageUrl);

    const fileName = imageUrl.split('/o/')[1].split('?')[0];

    await bucket.file(fileName).delete();
  }

  async updateImage(oldImageUrl: string, newImage): Promise<string> {
    await this.deleteImage(oldImageUrl);
    return this.uploadImage(newImage);
  }
}
