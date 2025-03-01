import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import * as FirebaseAdmin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth';
import { PrismaService } from 'src/prisma/prisma.service';

declare global {
  namespace Express {
    interface User extends DecodedIdToken {}
  }
}

@Injectable()
export class FirebaseAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super();
  }
  async validate(token: string): Promise<any> {
    try {
      const user = await FirebaseAdmin.auth().verifyIdToken(token);
      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
