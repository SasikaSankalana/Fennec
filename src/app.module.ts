import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AdminModule } from './admin/admin.module';
import { AdminTermsConditionsService } from './admin/admin-terms/admin-terms-conditions.service';
import { AdminTermsConditionsController } from './admin/admin-terms/admin-terms-condition.controller';
import { APP_GUARD } from '@nestjs/core';
import { FirebaseGuard } from './auth/guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    PrismaModule,
    UserModule,
    AdminModule,
  ],
  providers: [
    AdminTermsConditionsService,
    // { provide: APP_GUARD, useClass: FirebaseGuard },
  ],
  controllers: [AdminTermsConditionsController],
})
export class AppModule {}
