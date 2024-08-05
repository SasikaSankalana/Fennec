import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserTermsConditionsService {
  constructor(private prisma: PrismaService) {}

  async getTerms(clubId: string) {
    try {
      const terms = await this.prisma.termsAndConditions.findFirst({
        where: {
          clubId: clubId,
        },
      });

      if (!terms) {
        throw new BadRequestException('No terms and conditions found');
      }

      return terms;
    } catch (error) {
      throw error;
    }
  }
}
