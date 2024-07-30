import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { FirebaseAuthStrategy } from './strategy/firebase.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [JwtModule.register({}), UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseAuthStrategy],
})
export class AuthModule {}
