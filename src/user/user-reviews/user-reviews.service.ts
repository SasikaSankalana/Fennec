import { Injectable } from '@nestjs/common';
import { ReviewDto } from './dto/review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserReviewsService {
  constructor(private prisma: PrismaService) {}

  async addReview(dto: ReviewDto, userId: string, clubId: string) {
    try {
      const newReview = await this.prisma.clubReview.create({
        data: {
          name: dto.name,
          email: dto.email,
          totalPoints: dto.totalPoints,
          rating: dto.rating,
          comment: dto.comment,
          club: {
            connect: {
              id: clubId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return newReview;
    } catch (error) {
      throw error;
    }
  }

  async getReviews(clubId: string) {
    try {
      const reviews = await this.prisma.clubReview.findMany({
        where: {
          clubId: clubId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          totalPoints: true,
          rating: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });

      return reviews;
    } catch (error) {
      throw error;
    }
  }
}
