import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminClubNightDto } from './dto';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class AdminClubNightService {
  constructor(
    private prisma: PrismaService,
    private imageService: ImageService,
  ) {}

  async addClubNight(dto: AdminClubNightDto) {
    try {
      const clubNightValidate = await this.clubNightValidate(dto);

      if (clubNightValidate !== true) {
        throw clubNightValidate;
      }

      const savedPhotoUrl = await this.imageService.uploadImage(dto.photoUrl);

      const clubNight = await this.prisma.clubNight.create({
        data: {
          name: dto.name,
          dateTime: dto.dateTime,
          description: dto.description,
          photoUrl: savedPhotoUrl,
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

  async updateClubNight(clubNightId: string, dto: AdminClubNightDto) {
    try {
      const clubNightValidate = await this.clubNightValidate(dto);

      if (clubNightValidate !== true) {
        throw clubNightValidate;
      }

      const existingClubNight = await this.prisma.clubNight.findUnique({
        where: {
          id: clubNightId,
        },
      });

      const savedPhotoUrl = await this.imageService.updateImage(
        existingClubNight.photoUrl,
        dto.photoUrl,
      );

      const updatedClubNight = await this.prisma.clubNight.update({
        where: {
          id: clubNightId,
        },
        data: {
          name: dto.name,
          dateTime: dto.dateTime,
          description: dto.description,
          photoUrl: savedPhotoUrl,
        },
      });

      return updatedClubNight;
    } catch (error) {
      throw error;
    }
  }

  async clubNightValidate(dto: AdminClubNightDto) {
    const club = await this.prisma.club.findUnique({
      where: {
        id: dto.clubId,
      },
    });

    if (!club) {
      return new BadRequestException('Club not found');
    }

    if (dto.dateTime < new Date()) {
      return new BadRequestException('Date must be in the future');
    }

    //check whether a club night exists for the same date in the same club
    const existingClubNight = await this.prisma.clubNight.findFirst({
      where: {
        clubId: dto.clubId,
        dateTime: {
          gte: new Date(dto.dateTime.setHours(0, 0, 0, 0)),
          lte: new Date(dto.dateTime.setHours(23, 59, 59, 999)),
        },
      },
      include: {
        club: true,
      },
    });

    if (existingClubNight) {
      return new BadRequestException(
        'A club night already exists for this club on the same date',
      );
    }

    return true;
  }

  async deleteClubNight(clubNightId: string) {
    try {
      const clubNight = await this.prisma.clubNight.findUnique({
        where: { id: clubNightId },
      });

      if (!clubNight) {
        throw new BadRequestException('Club night not found');
      }

      await this.imageService.deleteImage(clubNight.photoUrl);

      const deletedClubNight = await this.prisma.clubNight.delete({
        where: {
          id: clubNightId,
        },
      });

      return deletedClubNight;
    } catch (error) {
      throw error;
    }
  }

  async getClubNight(clubNightId: string) {
    try {
      const clubNights = await this.prisma.clubNight.findUnique({
        where: {
          id: clubNightId,
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

  async getClubLocation(clubNightId: string) {
    try {
      const clubLocation = await this.prisma.clubNight.findMany({
        where: { id: clubNightId },
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
