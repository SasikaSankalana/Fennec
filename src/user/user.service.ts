import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { locationDto, OnboardDto, paymentDetailsDto } from './dto';
import * as argon from 'argon2';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async Onboarding(dto: OnboardDto) {
    try {
      const existingOnboarding = await this.prisma.onboarding.findMany({
        where: {
          userId: dto.userId,
        },
      });

      if (existingOnboarding.length > 0) {
        throw new ForbiddenException(
          'Onboarding already exists for this user.',
        );
      }

      const onboarding = await this.prisma.onboarding.create({
        data: {
          residence: dto.residence,
          vancouverArea: dto.vancouverArea,
          nightlifeType: dto.nightlifeType,
          outingFrequency: dto.outingFrequency,
          favouriteInstrument: dto.favouriteInstrument,
          drinkOfChoice: dto.drinkOfChoice,
          groupOrAlone: dto.groupOrAlone,
          arrivalTime: dto.arrivalTime,
          appealingPromotion: dto.appealingPromotion,
          notificationPreference: dto.notificationPreference,
          nighlifeEnvironment: dto.nighlifeEnvironment,
          foodImportance: dto.foodImportance,
          drinkPreference: dto.drinkPreference,
          reasonForNightlife: dto.reasonForNightlife,
          user: {
            connect: {
              id: dto.userId,
            },
          },
        },
      });
      return onboarding;
    } catch (error) {
      throw error;
    }
  }

  async addPayment(dto: paymentDetailsDto) {
    try {
      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new Error(`Validation failed: ${errors}`);
      }

      const expiryDatePattern = /^\d{2}\/\d{2}$/;
      if (!expiryDatePattern.test(dto.expiryDate)) {
        throw new Error('Expiry date must be in the format MM/YY.');
      }

      const [month, year] = dto.expiryDate.split('/');
      const monthNumber = parseInt(month, 10);
      if (monthNumber < 1 || monthNumber > 12) {
        throw new Error('Expiry date month must be between 01 and 12.');
      }

      const hashedCardNumber = await argon.hash(dto.cardNumber);
      const hashedCvc = await argon.hash(dto.cvc);

      const existingPayments = await this.prisma.paymentDetails.findMany({
        where: {
          userId: dto.userId,
        },
      });

      for (const payment of existingPayments) {
        const match = await argon.verify(payment.cardNumber, dto.cardNumber);
        if (match) {
          if (match) {
            throw new ForbiddenException(
              'This card number is already added for this user account.',
            );
          }
        }
      }
      const payment = await this.prisma.paymentDetails.create({
        data: {
          paymentMethod: dto.paymentMethod,
          cardNumber: hashedCardNumber,
          expiryDate: dto.expiryDate,
          cardHolderName: dto.cardHolderName,
          cvc: hashedCvc,
          user: {
            connect: {
              id: dto.userId,
            },
          },
        },
      });

      return payment;
    } catch (error) {
      throw error;
    }
  }

  async changeLocation(dto: locationDto) {
    try {
      if (dto.latitude < -90 || dto.latitude > 90) {
        throw new BadRequestException('Latitude must be between -90 and 90.');
      }
      if (dto.longitude < -180 || dto.longitude > 180) {
        throw new BadRequestException(
          'Longitude must be between -180 and 180.',
        );
      }

      const existingLocation = await this.prisma.userLocation.findMany({
        where: {
          userId: dto.userId,
        },
      });

      if (existingLocation.length > 0) {
        return this.updateLocation(dto);
      } else {
        return this.addLocation(dto);
      }
    } catch (error) {
      throw error;
    }
  }

  async addLocation(dto: locationDto) {
    try {
      const location = await this.prisma.userLocation.create({
        data: {
          latitude: dto.latitude,
          longitude: dto.longitude,
          user: {
            connect: {
              id: dto.userId,
            },
          },
        },
      });
      return location;
    } catch (error) {
      throw error;
    }
  }

  async updateLocation(dto: locationDto) {
    try {
      const location = await this.prisma.userLocation.update({
        where: {
          id: dto.userId,
        },
        data: {
          latitude: dto.latitude,
          longitude: dto.longitude,
          user: {
            connect: {
              id: dto.userId,
            },
          },
        },
      });
      return location;
    } catch (error) {
      throw error;
    }
  }

  async updateTelephoneNumber(id: string, telephone: string) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          telephoneNumber: telephone,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }
}
