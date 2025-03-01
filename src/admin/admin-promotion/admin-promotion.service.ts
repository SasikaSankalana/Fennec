import { BadRequestException, Injectable } from '@nestjs/common';
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

  async updatePromotion(promotionId: string, dto: AdminPromotionDto) {
    try {
      const promotionValidate = await this.promotionValidate(dto);

      if (promotionValidate !== true) {
        throw promotionValidate;
      }

      const promotion = await this.prisma.promotion.update({
        where: {
          id: promotionId,
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
    const existingPromotion = await this.prisma.promotion.findFirst({
      where: {
        name: dto.name,
        clubId: dto.clubId,
        startDate: dto.startDate,
        endDate: dto.endDate,
      },
    });

    if (existingPromotion) {
      return new BadRequestException('Promotion already exists');
    }

    if (dto.startDate > dto.endDate) {
      return new BadRequestException('Start date cannot be after end date');
    }
    return true;
  }

  async deletePromotion(promotionId: string) {
    try {
      const promotion = await this.prisma.promotion.delete({
        where: {
          id: promotionId,
        },
      });

      return promotion;
    } catch (error) {
      throw error;
    }
  }

  async getPromotion(promotionId: string) {
    try {
      const promotion = await this.prisma.promotion.findUnique({
        where: {
          id: promotionId,
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
