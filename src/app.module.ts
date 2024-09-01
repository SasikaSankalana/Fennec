import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { APP_GUARD } from '@nestjs/core';
import { FirebaseGuard } from './auth/guard';
import { FirebaseModule } from './firebase/firebase.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    AdminModule,
    FirebaseModule,
    StripeModule.forRootAsync(),
  ],
  providers: [{ provide: APP_GUARD, useClass: FirebaseGuard }],
})
export class AppModule {}
