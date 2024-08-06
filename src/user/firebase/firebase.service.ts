import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService {
  private readonly storage: admin.storage.Storage;

  constructor(private configService: ConfigService) {
    const serviceAccount = require('../../../../fennec-ea571-firebase-adminsdk-b11cf-3b8e921e78.json');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: configService.get('FIREBASE_STORAGE_BUCKET'),
    });
    this.storage = admin.storage();
  }

  getStorageInstance(): admin.storage.Storage {
    return this.storage;
  }
}
