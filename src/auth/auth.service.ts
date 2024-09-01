import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { StripeService } from 'src/stripe/stripe.service';
import { SignUpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private stripe: StripeService,
  ) {}

  async signUp(dto: SignUpDto) {
    try {
      let stripeCustomerId = null;

      if (dto.paymentMethodId) {
        stripeCustomerId = await this.stripe.savePaymentMethod(
          dto.email,
          dto.name,
          dto.paymentMethodId,
        );
      }

      const newUser = await this.prisma.user.create({
        data: {
          name: dto.name,
          telephoneNumber: dto.telephoneNumber,
          email: dto.email.toLowerCase(),
          gender: dto.gender,
          dateOfBirth: dto.dateOfBirth,
          stripeCustomerId,
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
