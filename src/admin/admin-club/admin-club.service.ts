import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AdminClubDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminClubService {
  constructor(private prisma: PrismaService) {}

  async addClub(dto: AdminClubDto) {
    try {
      const clubValidate = await this.clubValidate(dto);

      if (clubValidate != true) {
        throw clubValidate;
      }

      const club = await this.prisma.club.create({
        data: {
          name: dto.name,
          clubOwner: {
            connect: {
              id: dto.clubOwnerId,
            },
          },
          clubLocation: {
            create: {
              name: dto.locationName,
              latitude: dto.latitude,
              longitude: dto.longitude,
              address: dto.address,
              postalCode: dto.postalCode,
              city: dto.city,
              country: dto.country,
            },
          },
        },
        include: {
          clubLocation: true,
        },
      });

      return club;
    } catch (error) {
      throw error;
    }
  }

  async updateClub(id: string, dto: AdminClubDto) {
    try {
      const club = await this.prisma.club.update({
        where: {
          id: id,
        },
        data: {
          name: dto.name,
          clubOwner: {
            connect: {
              id: dto.clubOwnerId,
            },
          },
          clubLocation: {
            update: {
              name: dto.locationName,
              latitude: dto.latitude,
              longitude: dto.longitude,
              address: dto.address,
              postalCode: dto.postalCode,
              city: dto.city,
              country: dto.country,
            },
          },
        },
        include: {
          clubLocation: true,
        },
      });
      return { club };
    } catch (error) {
      throw error;
    }
  }

  async clubValidate(dto: AdminClubDto) {
    const existingClub = await this.prisma.club.findFirst({
      where: {
        name: dto.name,
        clubLocation: {
          latitude: dto.latitude,
          longitude: dto.longitude,
        },
      },
      include: {
        clubLocation: true,
      },
    });

    if (existingClub) {
      return new BadRequestException(
        'A club with this name already exists in this location',
      );
    }
    return true;
  }

  async deleteClub(id: string) {
    try {
      const club = await this.prisma.club.findUnique({
        where: { id },
      });

      if (!club) {
        throw new ForbiddenException('Club not found');
      }

      await this.prisma.club.delete({
        where: {
          id: id,
        },
        include: {
          clubLocation: true,
        },
      });

      return club;
    } catch (error) {
      throw error;
    }
  }

  async getClub(id: string) {
    try {
      const club = await this.prisma.club.findUnique({
        where: {
          id: id,
        },
        include: {
          clubOwner: true,
          clubLocation: true,
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
        include: {
          clubOwner: true,
          clubLocation: true,
        },
      });

      return clubs;
    } catch (error) {
      throw error;
    }
  }
}
