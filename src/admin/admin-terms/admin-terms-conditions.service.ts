import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TermsAndConditionsDto } from './dto';

@Injectable()
export class AdminTermsConditionsService {
  constructor(private prisma: PrismaService) {}

  async addTerm(clubId: string, dto: TermsAndConditionsDto) {
    try {
      const terms = await this.prisma.termsAndConditions.findFirst({
        where: {
          clubId: clubId,
        },
      });

      let term;
      if (terms) {
        term = this.updateTerm(clubId, dto);
      } else {
        term = await this.prisma.termsAndConditions.create({
          data: {
            termsAndConditions: dto.terms,
            club: {
              connect: {
                id: clubId,
              },
            },
          },
        });
      }

      return term;
    } catch (error) {
      throw error;
    }
  }

  async updateTerm(clubId: string, dto: TermsAndConditionsDto) {
    try {
      const clubTerms = await this.prisma.termsAndConditions.findFirst({
        where: {
          clubId: clubId,
        },
      });
      const term = await this.prisma.termsAndConditions.update({
        where: {
          id: clubTerms.id,
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
