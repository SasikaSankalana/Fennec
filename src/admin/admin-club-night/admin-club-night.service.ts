import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminClubNightDto } from './dto';

@Injectable()
export class AdminClubNightService {
  constructor(private prisma: PrismaService) {}

  async addClubNight(dto: AdminClubNightDto) {
    try {
      const club = await this.prisma.club.findUnique({
        where: {
          id: dto.clubId,
        },
      });

      if (!club) {
        throw new BadRequestException('Club not found');
      }

      const clubNight = await this.prisma.clubNight.create({
        data: {
          name: dto.name,
          dateTime: dto.dateTime,
          description: dto.description,
          club: {
            connect: {
              id: dto.clubId,
            },
          },
        },
      });

      return clubNight;
    } catch (error) {
      throw error;
    }
  }

  async updateClubNight(id: string, dto: AdminClubNightDto) {
    try {
      const clubNight = await this.prisma.clubNight.findUnique({
        where: {
          id: id,
        },
      });

      if (!clubNight) {
        throw new BadRequestException('Club night not found');
      }

      const updatedClubNight = await this.prisma.clubNight.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
          dateTime: dto.dateTime,
          description: dto.description,
        },
      });

      return updatedClubNight;
    } catch (error) {
      throw error;
    }
  }

  async deleteClubNight(id: string) {
    try {
      const clubNight = await this.prisma.clubNight.findUnique({
        where: { id },
      });

      if (!clubNight) {
        throw new BadRequestException('Club night not found');
      }

      await this.prisma.clubNight.delete({
        where: {
          id,
        },
      });

      return { message: 'Club night deleted' };
    } catch (error) {
      throw error;
    }
  }

  async getClubNight(id: string) {
    try {
      const clubNights = await this.prisma.clubNight.findUnique({
        where: {
          id,
        },
      });

      return clubNights;
    } catch (error) {
      throw error;
    }
  }

  async getClubNights() {
    try {
      const clubNights = await this.prisma.clubNight.findMany();

      return clubNights;
    } catch (error) {
      throw error;
    }
  }

  async getClubLocation(id: string) {
    try {
      const clubLocation = await this.prisma.clubNight.findMany({
        where: { id: id },
        select: {
          club: {
            select: {
              clubLocation: {
                select: {
                  latitude: true,
                  longitude: true,
                },
              },
            },
          },
        },
      });

      return clubLocation;
    } catch (error) {
      throw error;
    }
  }
}
