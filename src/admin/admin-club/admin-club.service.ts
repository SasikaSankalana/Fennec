import { Injectable } from '@nestjs/common';
import { AdminClubDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AdminClubService {
  constructor(private prisma: PrismaService) {}

  async addClub(dto: AdminClubDto) {
    const club = await this.prisma.club.create({
      data: {
        name: dto.name,
        clubOwner: {
          connect: {
            id: dto.clubOwnerId,
          },
        },
        ClubLocation: {
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
    });

    return { club };
  }

  //check update logic again
  async updateClub(id: string, dto: AdminClubDto) {}

  async deleteClub(id: string) {}

  async getClub(id: string) {}
}
