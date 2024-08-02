import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as FirebaseAdmin from 'firebase-admin';
import * as FirebaseClient from 'firebase/app';

@Module({
  imports: [ConfigModule.forRoot()],
})
export class FirebaseModule implements OnApplicationBootstrap {
  constructor(private configService: ConfigService) {}

  async onApplicationBootstrap() {
    const firebaseAdminConfig = {
      type: 'service_account',
      project_id: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      private_key_id: this.configService.get<string>('FIREBASE_PRIVATE_KEY_ID'),
      private_key: this.configService
        .get<string>('FIREBASE_PRIVATE_KEY')
        .replace(/\\n/g, '\n'),
      client_email: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
      client_id: this.configService.get<string>('FIREBASE_CLIENT_ID'),
      auth_uri: 'https://accounts.google.com/o/oauth2/auth',
      token_uri: 'https://oauth2.googleapis.com/token',
      auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
      client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${this.configService.get<string>('FIREBASE_CLIENT_EMAIL')}`,
      universe_domain: 'googleapis.com',
    };

    FirebaseAdmin.initializeApp({
      credential: FirebaseAdmin.credential.cert(
        firebaseAdminConfig as FirebaseAdmin.ServiceAccount,
      ),
    });

    const clientConfigJsonString = {
      apiKey: this.configService.get<string>('FIREBASE_API_KEY'),
      authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN'),
      projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
      storageBucket: this.configService.get<string>('FIREBASE_STORAGE_BUCKET'),
      messagingSenderId: this.configService.get<string>(
        'FIREBASE_MESSAGING_SENDER_ID',
      ),
      appId: this.configService.get<string>('FIREBASE_APP_ID'),
      measurementId: this.configService.get<string>('FIREBASE_MEASUREMENT_ID'),
    };

    FirebaseClient.initializeApp(
      clientConfigJsonString as FirebaseClient.FirebaseOptions,
    );
  }
}
