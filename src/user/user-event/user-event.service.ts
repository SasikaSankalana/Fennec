import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserEventService {
  constructor(private prisma: PrismaService) {}

  async getEvent(eventId: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: {
          id: eventId,
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
                  city: true,
                  postalCode: true,
                  country: true,
                  latitude: true,
                  longitude: true,
                },
              },
            },
          },
        },
      });

      if (!event) {
        throw new ForbiddenException('Club not found');
      }

      return event;
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
          clubId: true,
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
                  address: true,
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
