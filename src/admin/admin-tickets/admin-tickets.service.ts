import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketAddOnsDto, TicketTiersDto } from './dto';

@Injectable()
export class AdminTicketsService {
  constructor(private prisma: PrismaService) {}

  async createTicketTier(
    tiers: TicketTiersDto,
    functionId: string,
  ): Promise<any> {
    try {
      const ticketTiers = [];
      if (tiers.isEvent) {
        for (const tier of tiers.ticketTiers) {
          const ticketTier = await this.prisma.ticketTier.create({
            data: {
              name: tier.name,
              price: tier.price,
              totalQuantity: tier.totalQuantity,
              isPrivate: tier.isPrivate,
              currentQuantity: tier.totalQuantity,
              event: {
                connect: {
                  id: functionId,
                },
              },
              clubNight: {},
            },
          });
          ticketTiers.push(ticketTier);
        }
      } else {
        for (const tier of tiers.ticketTiers) {
          const ticketTier = await this.prisma.ticketTier.create({
            data: {
              name: tier.name,
              price: tier.price,
              totalQuantity: tier.totalQuantity,
              isPrivate: tier.isPrivate,
              currentQuantity: tier.totalQuantity,
              clubNight: {
                connect: {
                  id: functionId,
                },
              },
              event: {},
            },
          });
          ticketTiers.push(ticketTier);
        }
      }
      return ticketTiers;
    } catch (error) {
      throw error;
    }
  }

  async createAddOn(addons: TicketAddOnsDto, functionId: string): Promise<any> {
    try {
      const ticketAddOns = [];
      if (addons.isEvent) {
        for (const addon of addons.ticketAddOns) {
          const ticketAddOn = await this.prisma.ticketAddOn.create({
            data: {
              name: addon.name,
              price: addon.price,
              maxQuantity: addon.maxQty,
              event: {
                connect: {
                  id: functionId,
                },
              },
              clubNight: {},
            },
          });
          ticketAddOns.push(ticketAddOn);
        }
      } else {
        for (const addon of addons.ticketAddOns) {
          const ticketAddOn = await this.prisma.ticketAddOn.create({
            data: {
              name: addon.name,
              price: addon.price,
              maxQuantity: addon.maxQty,
              clubNight: {
                connect: {
                  id: functionId,
                },
              },
              event: {},
            },
          });
          ticketAddOns.push(ticketAddOn);
        }
      }
      return ticketAddOns;
    } catch (error) {
      throw error;
    }
  }
}
