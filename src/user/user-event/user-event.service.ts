import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserEventService {
  constructor(private prisma: PrismaService) {}

  async getEvent(eventId: string, userId: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: {
          id: eventId,
        },
        select: {
          id: true,
          name: true,
          dateTime: true,
          description: true,
          club: {
            select: {
              id: true,
              name: true,
              clubLocation: {
                select: {
                  id: true,
                  name: true,
                  address: true,
                  latitude: true,
                  longitude: true,
                  city: true,
                  postalCode: true,
                  country: true,
                },
              },
            },
          },
        },
      });

      if (!event) {
        throw new ForbiddenException('Event not found');
      }

      const reservation = await this.prisma.reservation.findFirst({
        where: {
          userId: userId,
          eventId: eventId,
        },
      });

      let isReserved = false;
      if (reservation) {
        isReserved = true;
      }
      return { event, isReserved };
    } catch (error) {
      throw error;
    }
  }

  async getEvents() {
    try {
      const events = await this.prisma.event.findMany({
        select: {
          id: true,
          name: true,
          dateTime: true,
          club: {
            select: {
              id: true,
              name: true,
              clubLocation: {
                select: {
                  id: true,
                  name: true,
                  address: true,
                  latitude: true,
                  longitude: true,
                  city: true,
                  postalCode: true,
                  country: true,
                },
              },
            },
          },
        },
      });

      return events;
    } catch (error) {
      throw error;
    }
  }

  async getUpcomingEvents(clubId: string) {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          clubId: clubId,
          dateTime: {
            gt: new Date(),
          },
        },
        select: {
          id: true,
          name: true,
          dateTime: true,
          club: {
            select: {
              id: true,
              name: true,
              clubLocation: {
                select: {
                  id: true,
                  name: true,
                  address: true,
                  latitude: true,
                  longitude: true,
                  city: true,
                  postalCode: true,
                  country: true,
                },
              },
            },
          },
        },
      });

      return events;
    } catch (error) {
      throw error;
    }
  }
}
