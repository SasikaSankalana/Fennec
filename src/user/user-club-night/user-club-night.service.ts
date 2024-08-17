import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserClubNightService {
  constructor(private prisma: PrismaService) {}

  async getClubNight(clubNightId: string, userId: string) {
    try {
      const clubNight = await this.prisma.clubNight.findUnique({
        where: {
          id: clubNightId,
        },
        select: {
          id: true,
          name: true,
          dateTime: true,
          club: {
            select: {
              id: true,
              name: true,
              clubLocation: {
                select: {
                  id: true,
                  name: true,
                  address: true,
                  latitude: true,
                  longitude: true,
                  city: true,
                  postalCode: true,
                  country: true,
                },
              },
            },
          },
        },
      });

      if (!clubNight) {
        throw new ForbiddenException('Club Night not found');
      }

      const reservation = await this.prisma.reservation.findFirst({
        where: {
          userId: userId,
          clubNightId: clubNightId,
        },
      });

      let isReserved = false;
      if (reservation) {
        isReserved = true;
      }
      return { clubNight, isReserved };

      return clubNight;
    } catch (error) {
      throw error;
    }
  }

  async getClubNights() {
    try {
      const clubNights = await this.prisma.clubNight.findMany({
        select: {
          id: true,
          name: true,
          dateTime: true,
          club: {
            select: {
              id: true,
              name: true,
              clubLocation: {
                select: {
                  id: true,
                  name: true,
                  address: true,
                  latitude: true,
                  longitude: true,
                  city: true,
                  postalCode: true,
                  country: true,
                },
              },
            },
          },
        },
      });

      return clubNights;
    } catch (error) {
      throw error;
    }
  }

  async getUpcomingClubNights(clubId: string) {
    try {
      const clubNights = await this.prisma.clubNight.findMany({
        where: {
          clubId: clubId,
          dateTime: {
            gt: new Date(),
          },
        },
        select: {
          id: true,
          name: true,
          dateTime: true,
          club: {
            select: {
              id: true,
              name: true,
              clubLocation: {
                select: {
                  id: true,
                  name: true,
                  address: true,
                  latitude: true,
                  longitude: true,
                  city: true,
                  postalCode: true,
                  country: true,
                },
              },
            },
          },
        },
      });

      return clubNights;
    } catch (error) {
      throw error;
    }
  }
}
