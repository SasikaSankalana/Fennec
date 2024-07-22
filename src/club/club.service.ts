import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClubDto } from './dto';

@Injectable()
export class ClubService {
  constructor(private prisma: PrismaService) {}

  async addClub(dto: ClubDto) {
    const club = await this.prisma.club.create({
      data: {
        name: dto.name,
      },
    });

    const clubLocation = await this.prisma.clubLocation.create({
      data: {
        name: dto.locationName,
        latitude: dto.latitude,
        longitude: dto.longitude,
        address: dto.address,
        postalCode: dto.postalCode,
        city: dto.city,
        country: dto.country,
        club: {
          connect: {
            id: club.id,
          },
        },
      },
    });

    return { club, clubLocation };
  }

  //check update logic again
  async updateClub(id: string, dto: ClubDto) {
    const club = await this.prisma.club.update({
      where: {
        id: id,
      },
      data: {
        name: dto.name,
      },
    });

    const clubLocation = this.updateClubLocation(id, dto);

    return { club, clubLocation };
  }

  async updateClubLocation(id: string, dto: ClubDto) {
    const club = await this.prisma.club.findUnique({
      where: {
        id: id,
      },
    });

    const currentClubLocation = await this.prisma.clubLocation.findFirst({
      where: {
        clubId: club.id,
      },
    });

    const newClubLocation = await this.prisma.clubLocation.update({
      where: {
        id: currentClubLocation.id,
      },
      data: {
        name: dto.locationName,
        latitude: dto.latitude,
        longitude: dto.longitude,
        address: dto.address,
        postalCode: dto.postalCode,
        city: dto.city,
        country: dto.country,
      },
    });

    return newClubLocation;
  }
}
