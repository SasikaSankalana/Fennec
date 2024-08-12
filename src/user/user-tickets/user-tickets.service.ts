import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketSummaryDto } from './dto';

@Injectable()
export class UserTicketsService {
  constructor(private prisma: PrismaService) {}

  async getTickets(functionId: string) {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAddOns(functionId: string) {
    try {
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
    } catch (error) {
      throw new Error(error);
    }
  }

  async getTicketSummary(dto: TicketSummaryDto) {
    try {
      let total = 0;

      for (const tier of dto.ticketTiers) {
        total = total + tier.price * tier.qty;
      }

      for (const addOn of dto.ticketaddOns) {
        total += addOn.price * addOn.qty;
      }

      return { total, dto };
    } catch (error) {
      throw new Error(error);
    }
  }

  async reserveTickets(dto: TicketSummaryDto, userId: string) {
    try {
      const reservationData = await this.prisma.$transaction(async (tx) => {
        for (const tier of dto.ticketTiers) {
          const ticketTier = await tx.ticketTier.findUnique({
            where: { id: tier.id },
          });

          if (!ticketTier) {
            throw new BadRequestException('Ticket tier not found');
          }

          if (tier.qty > ticketTier.currentQuantity) {
            throw new BadRequestException('Not enough tickets available');
          }

          await tx.ticketTier.update({
            where: {
              id: tier.id,
            },
            data: {
              currentQuantity: {
                decrement: tier.qty,
              },
            },
          });
        }

        const isPaymentSuccess = await this.makePayment();

        const total = this.getTicketSummary(dto);

        if (!isPaymentSuccess) {
          throw new BadRequestException('Payment failed');
        }

        const reservation = await tx.reservation.create({
          data: {
            total: (await total).total,
            user: {
              connect: {
                id: userId,
              },
            },
          },
        });

        for (const tier of dto.ticketTiers) {
          for (tier.qty; tier.qty > 0; tier.qty--) {
            await tx.ticket.create({
              data: {
                price: tier.price,
                ticketTier: {
                  connect: {
                    id: tier.id,
                  },
                },
                reservation: {
                  connect: {
                    id: reservation.id,
                  },
                },
              },
            });
          }
        }

        for (const addOn of dto.ticketaddOns) {
          await tx.reservationAddOns.create({
            data: {
              quantity: addOn.qty,
              ticketAddOn: {
                connect: {
                  id: addOn.id,
                },
              },
              reservation: {
                connect: {
                  id: reservation.id,
                },
              },
            },
          });
        }

        const reservationData = await tx.reservation.findUnique({
          where: {
            id: reservation.id,
          },
          include: {
            Ticket: true,
            ReservationAddOns: true,
          },
        });
        return reservationData;
      });
      return reservationData;
    } catch (error) {
      throw error;
    }
  }

  async makePayment() {
    const isSuccess = true;
    //payment method
    if (isSuccess) {
      return true;
    } else {
      return false;
    }
  }
}
