import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminPromotionDto } from './dto';

@Injectable()
export class AdminPromotionService {
  constructor(private prisma: PrismaService) {}

  async addPromotion(dto: AdminPromotionDto) {
    try {
      const promotionValidate = await this.promotionValidate(dto);

      if (promotionValidate !== true) {
        throw promotionValidate;
      }

      const promotion = await this.prisma.promotion.create({
        data: {
          name: dto.name,
          description: dto.description,
          startDate: dto.startDate,
          endDate: dto.endDate,
          pointsRequired: dto.pointsRequired,
          club: {
            connect: {
              id: dto.clubId,
            },
          },
        },
      });

      return promotion;
    } catch (error) {
      throw error;
    }
  }

  async updatePromotion(id: string, dto: AdminPromotionDto) {
    try {
      const promotionValidate = await this.promotionValidate(dto);

      if (promotionValidate !== true) {
        throw promotionValidate;
      }

      const promotion = await this.prisma.promotion.update({
        where: {
          id,
        },
        data: {
          name: dto.name,
          description: dto.description,
          startDate: dto.startDate,
          endDate: dto.endDate,
          pointsRequired: dto.pointsRequired,
        },
      });

      return promotion;
    } catch (error) {
      throw error;
    }
  }

  async promotionValidate(dto: AdminPromotionDto) {
    if (dto.startDate > dto.endDate) {
      return new Error('Start date cannot be after end date');
    }
    return true;
  }

  async deletePromotion(id: string) {
    try {
      const promotion = await this.prisma.promotion.delete({
        where: {
          id,
        },
      });

      return promotion;
    } catch (error) {
      throw error;
    }
  }

  async getPromotion(id: string) {
    try {
      const promotion = await this.prisma.promotion.findUnique({
        where: {
          id,
        },
      });

      return promotion;
    } catch (error) {
      throw error;
    }
  }

  async getPromotions() {
    try {
      const promotions = await this.prisma.promotion.findMany();

      return promotions;
    } catch (error) {
      throw error;
    }
  }
}
