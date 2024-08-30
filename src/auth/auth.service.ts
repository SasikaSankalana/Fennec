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
          name: dto.name,
          telephoneNumber: dto.telephoneNumber,
          email: dto.email.toLowerCase(),
          gender: dto.gender,
          dateOfBirth: dto.dateOfBirth,
          UserSettings: {
            create: {
              groupInvitations: true,
              accountActivity: true,
              updatesAndEnhancements: true,
              enableNotifications: true,
              enableSounds: true,
              enableRewards: true,
            },
          },
          UserLocation: {
            create: {
              latitude: dto.latitude,
              longitude: dto.longitude,
            },
          },
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

    if (!user) {
      throw new Error('User not found');
    }

    return { userId: user.id };
  }
}
