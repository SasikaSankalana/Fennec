import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ImageService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private configService: ConfigService,
  ) {}

  async uploadImage(file): Promise<string> {
    const storage = this.firebaseService.getStorageInstance();
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
}
