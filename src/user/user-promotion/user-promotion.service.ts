import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RedeemPromotionDto } from './dto';

@Injectable()
export class UserPromotionService {
  constructor(private prisma: PrismaService) {}

  async getPromotion(id: string) {
    try {
      const promotion = await this.prisma.promotion.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          description: true,
          clubId: true,
        },
      });

      if (!promotion) {
        throw new ForbiddenException('Promotion not found');
      }

      return promotion;
    } catch (error) {
      throw error;
    }
  }

  async getClubPromotions(clubId: string) {
    try {
      const promotions = await this.prisma.promotion.findMany({
        where: {
          clubId: clubId,
        },
        select: {
          id: true,
          name: true,
          description: true,
          clubId: true,
        },
      });

      return promotions;
    } catch (error) {
      throw error;
    }
  }

  async getPromotions() {
    try {
      const promotions = await this.prisma.promotion.findMany({
        select: {
          id: true,
          name: true,
          description: true,
          clubId: true,
          club: {
            select: {
              name: true,
            },
          },
        },
      });

      return promotions;
    } catch (error) {
      throw error;
    }
  }

  async redeemPromotion(
    clubId: string,
    promotionId: string,
    dto: RedeemPromotionDto,
  ) {
    try {
      const userClubPoints = await this.prisma.userClubPoints.findFirst({
        where: {
          userId: dto.userId,
          clubId: clubId,
        },
      });

      if (!userClubPoints) {
        throw new BadRequestException(
          'User has no redeemable points for this club',
        );
      }

      if (userClubPoints.points < dto.requiredPoints) {
        throw new BadRequestException('Insufficient points');
      }

      let redeemedPromotion;

      if (dto.isEvent) {
        redeemedPromotion = await this.prisma.userPromotionEvent.create({
          data: {
            promotion: {
              connect: {
                id: promotionId,
              },
            },
            event: {
              connect: {
                id: dto.functionId,
              },
            },
            clubNight: {},
            user: {
              connect: {
                id: dto.userId,
              },
            },
          },
        });
      } else {
        redeemedPromotion = await this.prisma.userPromotionEvent.create({
          data: {
            promotion: {
              connect: {
                id: promotionId,
              },
            },
            clubNight: {
              connect: {
                id: dto.functionId,
              },
            },
            event: {},
            user: {
              connect: {
                id: dto.userId,
              },
            },
          },
        });
      }

      const updatedPoints = await this.prisma.userClubPoints.update({
        where: {
          id: userClubPoints.id,
        },
        data: {
          points: {
            decrement: dto.requiredPoints,
          },
        },
      });
      return { updatedPoints, redeemedPromotion };
    } catch (error) {
      throw error;
    }
  }

  async getRedeemedPromotions(userId: string) {
    try {
      const redeemedPromotions = await this.prisma.userPromotionEvent.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          promotionId: true,
          eventId: true,
        },
      });

      return redeemedPromotions;
    } catch (error) {
      throw error;
    }
  }

  async getUserPoints(userId: string) {
    try {
      const userClubPoints = await this.prisma.userClubPoints.findMany({
        where: {
          userId: userId,
        },
        select: {
          points: true,
        },
      });

      return userClubPoints;
    } catch (error) {
      throw error;
    }
  }
}
