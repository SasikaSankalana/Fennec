import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { AdminClubDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class AdminClubService {
  constructor(
    private prisma: PrismaService,
    private imageService: ImageService,
  ) {}

  async addClub(dto: AdminClubDto) {
    try {
      const clubValidate = await this.clubValidate(dto);

      if (clubValidate != true) {
        throw clubValidate;
      }

      const savedPhotoUrl = await this.imageService.uploadImage(dto.photoUrl);

      const club = await this.prisma.club.create({
        data: {
          name: dto.name,
          capacity: dto.capacity,
          photoUrl: savedPhotoUrl,
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

  async updateClub(clubId: string, dto: AdminClubDto) {
    try {
      const existingClub = await this.prisma.club.findUnique({
        where: { id: clubId },
        select: {
          photoUrl: true,
        },
      });

      if (!existingClub) {
        throw new ForbiddenException('Club not found');
      }

      const savedPhotoUrl = await this.imageService.updateImage(
        existingClub.photoUrl,
        dto.photoUrl,
      );

      const club = await this.prisma.club.update({
        where: {
          id: clubId,
        },
        data: {
          name: dto.name,
          capacity: dto.capacity,
          photoUrl: savedPhotoUrl,
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
      return club;
    } catch (error) {
      throw error;
    }
  }

  async deleteClub(clubId: string) {
    try {
      const club = await this.prisma.club.findUnique({
        where: { id: clubId },
        select: {
          photoUrl: true,
        },
      });

      if (!club) {
        throw new BadRequestException('Club not found');
      }

      await this.imageService.deleteImage(club.photoUrl);

      await this.prisma.club.delete({
        where: {
          id: clubId,
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

  async clubValidate(dto: AdminClubDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.clubOwnerId,
      },
    });

    if (!user) {
      return new BadRequestException('User not found');
    }

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

  async getClub(clubId: string) {
    try {
      const club = await this.prisma.club.findUnique({
        where: {
          id: clubId,
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
