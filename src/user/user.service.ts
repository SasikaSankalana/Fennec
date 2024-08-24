import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { locationDto, OnboardDto, paymentDetailsDto, UserDto } from './dto';
import * as argon from 'argon2';
import { userSettingsDto } from './dto/settings.dto';
import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private imageService: ImageService,
  ) {}

  async Onboarding(userId: string, dto: OnboardDto) {
    try {
      const existingOnboarding = await this.prisma.onboarding.findFirst({
        where: {
          userId: userId,
        },
      });

      if (existingOnboarding) {
        throw new BadRequestException(
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
              id: userId,
            },
          },
        },
      });
      return onboarding;
    } catch (error) {
      throw error;
    }
  }

  async addPayment(userId: string, dto: paymentDetailsDto) {
    try {
      const regex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      regex.test(dto.expiryDate);
      if (!regex.test(dto.expiryDate)) {
        throw new BadRequestException('Invalid expiry date format.');
      }

      const hashedCardNumber = await argon.hash(dto.cardNumber);
      const hashedCvc = await argon.hash(dto.cvc);

      const existingPayments = await this.prisma.paymentDetails.findMany({
        where: {
          userId: userId,
        },
      });

      for (const payment of existingPayments) {
        const match = await argon.verify(payment.cardNumber, dto.cardNumber);
        if (match) {
          throw new Error(
            'This card number is already added for this user account.',
          );
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
              id: userId,
            },
          },
        },
      });

      return payment;
    } catch (error) {
      console.log(error);
      console.error('Error adding payment:', error.message);
      throw error;
    }
  }

  async validateLocation(dto: locationDto) {
    if (dto.latitude < -90 || dto.latitude > 90) {
      return new BadRequestException('Latitude must be between -90 and 90.');
    }
    if (dto.longitude < -180 || dto.longitude > 180) {
      return new BadRequestException('Longitude must be between -180 and 180.');
    }
    return true;
  }

  async addLocation(userId: string, dto: locationDto) {
    try {
      const locationValidation = await this.validateLocation(dto);

      if (locationValidation !== true) {
        throw locationValidation;
      }

      const existingLocation = await this.prisma.userLocation.findFirst({
        where: {
          userId: userId,
          longitude: dto.longitude,
          latitude: dto.latitude,
        },
      });

      if (existingLocation) {
        throw new BadRequestException('Location already set for this user');
      }

      const updateLocation = await this.prisma.userLocation.findMany({
        where: {
          userId: userId,
        },
      });

      if (updateLocation.length > 0) {
        return this.updateLocation(userId, dto);
      }

      const location = await this.prisma.userLocation.create({
        data: {
          latitude: dto.latitude,
          longitude: dto.longitude,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return location;
    } catch (error) {
      throw error;
    }
  }

  async updateLocation(userId: string, dto: locationDto) {
    try {
      const locationValidation = await this.validateLocation(dto);

      if (locationValidation !== true) {
        throw locationValidation;
      }
      const existingLocation = await this.prisma.userLocation.findFirst({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          userId: true,
          longitude: true,
          latitude: true,
        },
      });

      const location = await this.prisma.userLocation.update({
        where: {
          id: existingLocation.id,
        },
        data: {
          latitude: dto.latitude,
          longitude: dto.longitude,
          user: {
            connect: {
              id: userId,
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

  async updateUser(id: string, dto: UserDto) {
    try {
      const user = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
          // username: dto.username,
          telephoneNumber: dto.telephoneNumber,
          dateOfBirth: dto.dateOfBirth,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUserSettings(userId: string, dto: userSettingsDto) {
    try {
      const user = await this.prisma.userSettings.findFirst({
        where: {
          userId: userId,
        },
        select: {
          id: true,
        },
      });

      const userSettings = await this.prisma.userSettings.update({
        where: {
          id: user.id,
        },
        data: {
          groupInvitations: dto.groupInvitations,
          accountActivity: dto.accountActivity,
          updatesAndEnhancements: dto.updatesAndEnhancements,
          enableNotifications: dto.enableNotifications,
          enableSounds: dto.enableSounds,
          enableRewards: dto.enableRewards,
        },
      });
      return userSettings;
    } catch (error) {
      throw error;
    }
  }

  async getUserSettings(userId: string) {
    try {
      const userSettings = await this.prisma.userSettings.findFirst({
        where: {
          userId: userId,
        },
      });
      return userSettings;
    } catch (error) {
      throw error;
    }
  }

  async getUser(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      const userClubPoints = await this.prisma.userClubPoints.findMany({
        where: {
          userId: userId,
        },
      });

      let totalPoints = 0;
      for (const clubPoints of userClubPoints) {
        totalPoints += clubPoints.points;
      }

      return { user, totalPoints };
    } catch (error) {
      throw error;
    }
  }

  async deleteUserPhoto(userId: string) {
    try {
      const photoUser = await this.prisma.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          photoUrl: true,
        },
      });

      if (!photoUser) {
        throw new BadRequestException('User not found');
      }

      if (!photoUser.photoUrl || photoUser.photoUrl.trim() === '') {
        throw new BadRequestException('No photo URL found for the user');
      }

      await this.imageService.deleteImage(photoUser.photoUrl);

      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          photoUrl: null,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUserPhoto(userId: string, file: MulterField) {
    try {
      const savedPhotoUrl = await this.imageService.uploadImage(file);

      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          photoUrl: savedPhotoUrl,
        },
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async addPoints(userId: string, clubId: string, points: number) {
    try {
      const userClubPoints = await this.prisma.userClubPoints.findFirst({
        where: {
          userId: userId,
          clubId: clubId,
        },
      });

      if (userClubPoints) {
        const updatedPoints = await this.prisma.userClubPoints.update({
          where: {
            id: userClubPoints.id,
          },
          data: {
            points: userClubPoints.points + points,
          },
        });
        return updatedPoints;
      } else {
        const createdPoints = await this.prisma.userClubPoints.create({
          data: {
            points: points,
            user: {
              connect: {
                id: userId,
              },
            },
            club: {
              connect: {
                id: clubId,
              },
            },
          },
        });
        return createdPoints;
      }
    } catch (error) {
      throw error;
    }
  }

  async getPaymentDetails(userId: string) {
    try {
      const paymentDetails = await this.prisma.paymentDetails.findMany({
        where: {
          userId: userId,
        },
      });
      return paymentDetails;
    } catch (error) {
      throw error;
    }
  }

  async getParticipants(functionId: string, isEvent: boolean) {
    try {
      if (isEvent) {
        const participants = await this.prisma.reservation.findMany({
          where: {
            eventId: functionId,
          },
          select: {
            user: {
              select: {
                id: true,
                name: true,
                photoUrl: true,
              },
            },
          },
        });
        return participants;
      } else {
        const participants = await this.prisma.reservation.findMany({
          where: {
            clubNightId: functionId,
          },
          select: {
            user: {
              select: {
                id: true,
                name: true,
                photoUrl: true,
              },
            },
          },
        });
        return participants;
      }
    } catch (error) {
      throw error;
    }
  }
}
