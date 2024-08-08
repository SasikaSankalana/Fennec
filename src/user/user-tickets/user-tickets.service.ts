import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketSummaryDto } from './dto';

@Injectable()
export class UserTicketsService {
  constructor(private prisma: PrismaService) {}

  async getTickets(functionId: string) {
    const ticketTiers = await this.prisma.ticketTier.findMany({
      where: {
        eventId: functionId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        currentQuantity: true,
      },
    });

    return ticketTiers;
  }

  async getAddOns(functionId: string) {
    const addOns = await this.prisma.ticketAddOn.findMany({
      where: {
        eventId: functionId,
      },
      select: {
        id: true,
        name: true,
        price: true,
        maxQuantity: true,
      },
    });
    return addOns;
  }

  getTicketSummary(dto: TicketSummaryDto) {
    let total = 0;

    for (const tier of dto.ticketTiers) {
      total = total + tier.price * tier.qty;
      for (const addOn of dto.ticketaddOns) {
        total += addOn.price * addOn.qty;
      }
    }

    return { total, dto };
  }
}
