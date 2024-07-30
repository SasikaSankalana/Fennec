import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async redeemPromotion(userId: string, requiredPoints: number) {
    try {
      const updatedPoints = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          currentPoints: {
            decrement: requiredPoints,
          },
        },
      });
      return updatedPoints;
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
