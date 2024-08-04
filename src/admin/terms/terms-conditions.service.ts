import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TermsAndConditionsDto } from './dto';

@Injectable()
export class TermsAndConditionsService {
  constructor(private prisma: PrismaService) {}

  async addTerm(dto: TermsAndConditionsDto) {
    try {
      const term = await this.prisma.termsAndConditions.create({
        data: {
          termsAndConditions: dto.terms,
          club: {
            connect: {
              id: dto.clubId,
            },
          },
        },
      });

      return term;
    } catch (error) {
      throw error;
    }
  }

  async updateTerm(termsId: string, dto: TermsAndConditionsDto) {
    try {
      const term = await this.prisma.termsAndConditions.update({
        where: {
          id: termsId,
        },
        data: {
          termsAndConditions: dto.terms,
        },
      });

      return term;
    } catch (error) {
      throw error;
    }
  }

  async getTerms(clubId: string) {
    try {
      const terms = await this.prisma.termsAndConditions.findMany({
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
