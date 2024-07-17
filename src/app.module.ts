import { Module } from '@nestjs/common';
import { HelloWorldModule } from './hello-world/hello-world.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [HelloWorldModule, AuthModule, PrismaModule],
})
export class AppModule {}
