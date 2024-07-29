import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserClubService {
  constructor(private prisma: PrismaService) {}

  async getClub(id: string) {
    try {
      const club = await this.prisma.club.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          clubLocationId: true,
          clubLocation: {
            select: {
              name: true,
              latitude: true,
              longitude: true,
              address: true,
              country: true,
              city: true,
              postalCode: true,
            },
          },
        },
      });

      if (!club) {
        throw new ForbiddenException('Club not found');
      }

      return club;
    } catch (error) {
      throw error;
    }
  }

  async getClubs() {
    try {
      const clubs = await this.prisma.club.findMany({
        select: {
          id: true,
          name: true,
          clubLocationId: true,
          clubLocation: {
            select: {
              name: true,
              latitude: true,
              longitude: true,
              address: true,
              country: true,
              city: true,
              postalCode: true,
            },
          },
        },
      });

      return clubs;
    } catch (error) {
      throw error;
    }
  }
}
