import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserEventService {
  constructor(private prisma: PrismaService) {}

  async getEvent(id: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          name: true,
          dateTime: true,
          clubId: true,
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

  async getPastEvents() {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          dateTime: {
            lt: new Date(),
          },
        },
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

  async getUpcomingEvents() {
    try {
      const events = await this.prisma.event.findMany({
        where: {
          dateTime: {
            gt: new Date(),
          },
        },
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
}
