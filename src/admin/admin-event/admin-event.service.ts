import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminEventDto } from './dto';

@Injectable()
export class AdminEventService {
  constructor(private prisma: PrismaService) {}

  async addEvent(dto: AdminEventDto) {
    try {
      const eventValidate = await this.eventValidate(dto);

      if (eventValidate !== true) {
        throw eventValidate;
      }

      const event = await this.prisma.event.create({
        data: {
          name: dto.name,
          dateTime: dto.dateTime,
          description: dto.description,
          club: {
            connect: {
              id: dto.clubId,
            },
          },
        },
      });

      return event;
    } catch (error) {
      throw error;
    }
  }

  async updateEvent(eventId: string, dto: AdminEventDto) {
    try {
      const eventValidate = await this.eventValidate(dto);

      if (eventValidate !== true) {
        throw eventValidate;
      }

      const updatedEvent = await this.prisma.event.update({
        where: {
          id: eventId,
        },
        data: {
          name: dto.name,
          dateTime: dto.dateTime,
          description: dto.description,
        },
      });

      return updatedEvent;
    } catch (error) {
      throw error;
    }
  }

  async eventValidate(dto: AdminEventDto) {
    const club = await this.prisma.club.findUnique({
      where: {
        id: dto.clubId,
      },
    });

    if (!club) {
      return new BadRequestException('Club not found');
    }

    if (dto.dateTime < new Date()) {
      return new BadRequestException('Date must be in the future');
    }

    const existingEvent = await this.prisma.event.findFirst({
      where: {
        clubId: dto.clubId,
        dateTime: {
          gte: new Date(dto.dateTime.setHours(0, 0, 0, 0)),
          lte: new Date(dto.dateTime.setHours(23, 59, 59, 999)),
        },
      },
      include: {
        club: true,
      },
    });

    if (existingEvent) {
      return new BadRequestException(
        'A event already exists for this club on the same date',
      );
    }

    return true;
  }

  async deleteEvent(eventId: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: { id: eventId },
      });

      if (!event) {
        throw new BadRequestException('Event not found');
      }

      const deletedEvent = await this.prisma.event.delete({
        where: {
          id: eventId,
        },
      });

      return deletedEvent;
    } catch (error) {
      throw error;
    }
  }

  async getEvent(eventId: string) {
    try {
      const events = await this.prisma.event.findUnique({
        where: {
          id: eventId,
        },
      });

      return events;
    } catch (error) {
      throw error;
    }
  }

  async getEvents() {
    try {
      const events = await this.prisma.event.findMany();

      return events;
    } catch (error) {
      throw error;
    }
  }

  async getClubLocation(eventId: string) {
    try {
      const clubLocation = await this.prisma.event.findMany({
        where: { id: eventId },
        select: {
          club: {
            select: {
              clubLocation: {
                select: {
                  latitude: true,
                  longitude: true,
                },
              },
            },
          },
        },
      });

      return clubLocation;
    } catch (error) {
      throw error;
    }
  }
}
