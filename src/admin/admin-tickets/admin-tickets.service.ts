import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketAddOnsDto, TicketTiersDto } from './dto';

@Injectable()
export class AdminTicketsService {
  constructor(private prisma: PrismaService) {}

  async createTicketTier(
    tiers: TicketTiersDto,
    functionId: string,
    isEvent: boolean,
  ): Promise<any> {
    try {
      const ticketTierData = await this.prisma.$transaction(async (tx) => {
        const ticketTiers = [];
        if (isEvent) {
          for (const tier of tiers.ticketTiers) {
            const existingTier = await tx.ticketTier.findFirst({
              where: {
                name: tier.name,
                event: {
                  id: functionId,
                },
              },
            });

            if (existingTier) {
              throw new ForbiddenException(
                `${tier.name} Tier for this Event already exists`,
              );
            }

            const ticketTier = await tx.ticketTier.create({
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
              },
            });
            ticketTiers.push(ticketTier);
          }
        } else {
          for (const tier of tiers.ticketTiers) {
            const existingTier = await tx.ticketTier.findFirst({
              where: {
                name: tier.name,
                clubNight: {
                  id: functionId,
                },
              },
            });

            if (existingTier) {
              throw new ForbiddenException(
                `${tier.name} Tier for this Club Night already exists`,
              );
            }

            const ticketTier = await tx.ticketTier.create({
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
              },
            });
            ticketTiers.push(ticketTier);
          }
        }
        return ticketTiers;
      });
      return ticketTierData;
    } catch (error) {
      throw error;
    }
  }

  async createAddOn(
    addons: TicketAddOnsDto,
    functionId: string,
    isEvent: boolean,
  ): Promise<any> {
    try {
      const ticketAddOns = [];
      if (isEvent) {
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
