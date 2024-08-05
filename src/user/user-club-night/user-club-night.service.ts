import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserClubNightService {
  constructor(private prisma: PrismaService) {}

  async getClubNight(clubNightId: string) {
    try {
      const clubNight = await this.prisma.clubNight.findUnique({
        where: {
          id: clubNightId,
        },
        select: {
          id: true,
          name: true,
          dateTime: true,
          clubId: true,
        },
      });

      if (!clubNight) {
        throw new ForbiddenException('Club not found');
      }

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
          clubId: true,
        },
      });

      return clubNights;
    } catch (error) {
      throw error;
    }
  }

  async getPastClubNights() {
    try {
      const clubNights = await this.prisma.clubNight.findMany({
        where: {
          dateTime: {
            lt: new Date(),
          },
        },
        select: {
          id: true,
          name: true,
          dateTime: true,
          clubId: true,
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
          clubId: true,
        },
      });

      return clubNights;
    } catch (error) {
      throw error;
    }
  }
}
