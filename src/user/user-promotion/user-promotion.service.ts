import { ForbiddenException, Injectable } from '@nestjs/common';
import { error } from 'node:console';
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

  async getPromotions() {
    try {
      const promotions = await this.prisma.promotion.findMany({
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

  async redeemPromotion(dto: RedeemPromotionDto) {
    try {
      const currentPoints = await this.prisma.user.findUnique({
        where: {
          id: dto.userId,
        },
        select: {
          currentPoints: true,
        },
      });

      if (currentPoints.currentPoints < dto.requiredPoints) {
        throw new error('Insufficient points');
      }

      const redeemedPromotion = await this.prisma.userPromotionEvent.create({
        data: {
          userAccountId: dto.userId,
          promotionId: dto.promotionId,
          eventId: dto.eventId,
        },
      });

      const updatedPoints = await this.prisma.user.update({
        where: {
          id: dto.userId,
        },
        data: {
          currentPoints: {
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
          userAccountId: userId,
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
      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          currentPoints: true,
        },
      });

      return user.currentPoints;
    } catch (error) {
      throw error;
    }
  }
}
