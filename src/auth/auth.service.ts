import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(dto: SignUpDto) {
    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: dto.name || '',
          telephoneNumber: dto.telephoneNumber || '',
          photoUrl: dto.photoUrl || '',
          email: dto.email.toLowerCase(),
          currentPoints: 0,
        },
      });

      return { userId: newUser.id };
    } catch (error) {
      throw error;
    }
  }

  async signIn(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return { userId: user.id };
  }
}
