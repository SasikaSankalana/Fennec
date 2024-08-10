import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserEventService } from '../user-event/user-event.service';
import { UserPromotionService } from '../user-promotion/user-promotion.service';
import { UserClubNightService } from '../user-club-night/user-club-night.service';
import { RedeemPromotionDto } from '../user-promotion/dto';

@Injectable()
export class UserClubService {
  constructor(
    private prisma: PrismaService,
    private userEventsService: UserEventService,
    private userPromotionService: UserPromotionService,
    private userClubNightService: UserClubNightService,
  ) {}

  async getClub(clubId: string) {
    try {
      const club = await this.prisma.club.findUnique({
        where: {
          id: clubId,
        },
        select: {
          id: true,
          name: true,
          Promotion: {
            select: {
              id: true,
              name: true,
              endDate: true,
              pointsRequired: true,
              description: true,
            },
          },
          // clubLocationId: true,
          // clubLocation: {
          //   select: {
          //     name: true,
          //     latitude: true,
          //     longitude: true,
          //     address: true,
          //     country: true,
          //     city: true,
          //     postalCode: true,
          //   },
          // },
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

  async getClubs(userId: string) {
    try {
      const userClubs = await this.prisma.userClubPoints.findMany({
        where: {
          userId: userId,
        },
        select: {
          clubId: true,
          points: true,
          club: {
            select: {
              id: true,
              name: true,
              Promotion: {
                select: {
                  id: true,
                  name: true,
                  description: true,
                  endDate: true,
                },
              },
            },
          },
        },
      });

      return userClubs;
    } catch (error) {
      throw error;
    }
  }

  async getUpcomingClubNights(clubId: string) {
    try {
      const clubNight =
        await this.userClubNightService.getUpcomingClubNights(clubId);

      return clubNight;
    } catch (error) {
      throw error;
    }
  }

  async getUpcomingEvents(clubId: string) {
    try {
      const event = await this.userEventsService.getUpcomingEvents(clubId);

      return event;
    } catch (error) {
      throw error;
    }
  }

  async getClubPromotion(clubId: string) {
    try {
      const promotion =
        await this.userPromotionService.getClubPromotions(clubId);

      return promotion;
    } catch (error) {
      throw error;
    }
  }

  async redeemClubPromotion(
    promotionId: string,
    clubId: string,
    dto: RedeemPromotionDto,
  ) {
    try {
      const promotion = await this.userPromotionService.redeemPromotion(
        promotionId,
        clubId,
        dto,
      );

      return promotion;
    } catch (error) {
      throw error;
    }
  }
}
