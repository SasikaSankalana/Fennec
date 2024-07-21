import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { paymentDetailsDto } from "./dto";
import * as argon from "argon2";
import { validate } from "class-validator";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async Onboarding(dto) {
    try {
      const existingOnboarding =
        await this.prisma.onboarding.findMany({
          where: {
            userAccountId: dto.userAccountId,
          },
        });

      if (existingOnboarding.length > 0) {
        throw new Error(
          "Onboarding already exists for this user."
        );
      }

      const onboarding =
        await this.prisma.onboarding.create({
          data: {
            residence: dto.residence,
            vancouverArea: dto.vancouverArea,
            nightlifeType: dto.nightlifeType,
            outingFreequency:
              dto.outingFreequency,
            favouriteInstrument:
              dto.favouriteInstrument,
            drinkOfChoice: dto.drinkOfChoice,
            groupOrAlone: dto.groupOrAlone,
            arrivalTime: dto.arrivalTime,
            appealingPromotion:
              dto.appealingPromotion,
            notificationPreference:
              dto.notificationPreference,
            nighlifeEnvironment:
              dto.nighlifeEnvironment,
            foodImportance: dto.foodImportance,
            drinkPreference: dto.drinkPreference,
            reasonForNightlife:
              dto.reasonForNightlife,
            userAccount: {
              connect: {
                id: dto.userAccountId,
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
      dto.expiryDate =
        dto.expiryDate + "T00:00:00.000Z";

      const errors = await validate(dto);
      if (errors.length > 0) {
        throw new Error(
          `Validation failed: ${errors}`
        );
      }
      const hashedCardNumber = await argon.hash(
        dto.cardNumber
      );
      const hashedCvc = await argon.hash(dto.cvc);

      const existingPayment =
        await this.prisma.paymentDetails.findFirst(
          {
            where: {
              cardNumber: hashedCardNumber,
              userAccountId: dto.userAccountId,
            },
          }
        );

      if (existingPayment) {
        throw new Error(
          "Card number already exists for this user."
        );
      }

      const payment =
        await this.prisma.paymentDetails.create({
          data: {
            paymentMethod: dto.paymentMethod,
            cardNumber: hashedCardNumber,
            expiryDate: dto.expiryDate,
            cardHolderName: dto.cardHolderName,
            cvc: hashedCvc,
            userAccount: {
              connect: {
                id: dto.userAccountId,
              },
            },
          },
        });

      return payment;
    } catch (error) {
      console.log(error);
      console.error(
        "Error adding payment:",
        error.message
      );
      throw error;
    }
  }

  async addLocation(dto) {
    try {
      if (
        dto.latitude < -90 ||
        dto.latitude > 90
      ) {
        throw new Error(
          "Latitude must be between -90 and 90."
        );
      }
      if (
        dto.longitude < -180 ||
        dto.longitude > 180
      ) {
        throw new Error(
          "Longitude must be between -180 and 180."
        );
      }

      const existingLocation =
        await this.prisma.userLocation.findFirst({
          where: {
            userAccountId: dto.userAccountId,
          },
        });

      const location =
        await this.prisma.userLocation.update({
          data: {
            latitude: dto.latitude,
            longitude: dto.longitude,
            userAccount: {
              connect: {
                id: dto.userAccountId,
              },
            },
          },
          where: undefined,
        });
      return location;
    } catch (error) {
      throw error;
    }
  }

  async updateLocation(dto) {
    try {
      if (
        dto.latitude < -90 ||
        dto.latitude > 90
      ) {
        throw new Error(
          "Latitude must be between -90 and 90."
        );
      }
      if (
        dto.longitude < -180 ||
        dto.longitude > 180
      ) {
        throw new Error(
          "Longitude must be between -180 and 180."
        );
      }

      const existingLocation =
        await this.prisma.userLocation.findFirst({
          where: {
            userAccountId: dto.userAccountId,
          },
        });

      if (existingLocation) {
        throw new Error(
          "Location is already created for this user"
        );
      }
      if (existingLocation) {
        const location =
          await this.prisma.userLocation.update({
            where: { id: existingLocation.id },
            data: {
              latitude: dto.latitude,
              longitude: dto.longitude,
              updatedAt: new Date(),
            },
          });
      }
      return location;
    } catch (error) {
      throw error;
    }
  }
}
