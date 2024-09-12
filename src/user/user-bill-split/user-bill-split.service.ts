import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SplitGroupDto, SplitPaymentDto } from './dto/index';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Injectable()
export class UserBillSplitService {
  constructor(private prismaService: PrismaService) {}

  async createSplitGroup(dto: SplitGroupDto, userId: string) {
    try {
      const splitGroup = await this.prismaService.splitGroup.create({
        data: {
          name: dto.groupName,
          createdBy: {
            connect: {
              id: userId,
            },
          },
          SplitGroupMembers: {
            createMany: {
              data: dto.friendsList.map((friend) => {
                return {
                  userId: friend,
                };
              }),
            },
          },
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
          SplitGroupMembers: {
            select: {
              userId: true,
              splitGroupId: true,
            },
          },
        },
      });

      return splitGroup;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getAllSplitGroups(userId: string) {
    try {
      const splitGroups = await this.prismaService.splitGroup.findMany({
        where: {
          createdBy: {
            id: userId,
          },
        },
        select: {
          id: true,
          name: true,
          SplitGroupMembers: {
            select: {
              userId: true,
              splitGroupId: true,
            },
          },
        },
      });
      return splitGroups;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getSplitGroupById(groupId: string) {
    try {
      const splitGroup = await this.prismaService.splitGroup.findUnique({
        where: {
          id: groupId,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
          SplitGroupMembers: {
            select: {
              userId: true,
              splitGroupId: true,
            },
          },
        },
      });

      return splitGroup;
    } catch (error) {
      throw new Error(error);
    }
  }

  // before creating data to this API, first connect a realtime database (firebase realtime database)
  // to the front and and get the confirmation from the other users to the front end.
  async splitPayment(userId: string, dto: SplitPaymentDto) {
    try {
      if (dto.splitPaymentType === 'GROUP') {
        if (!dto.splitGroupId) {
          throw new ForbiddenException(
            'Split Group Id is required for GROUP split type',
          );
        }
      }
      const splitPayment = await this.prismaService.splitPayment.create({
        data: {
          total: dto.amount,
          splitPaymentType: dto.splitPaymentType,
          splitType: dto.splitType,
          splitGroup: {
            connect: {
              id: dto.splitGroupId,
            },
          },
          createdBy: {
            connect: {
              id: userId,
            },
          },
          SplitPaymentUsers: {
            createMany: {
              data: dto.friendsList.map((friend) => {
                return {
                  userId: friend.userId,
                  amount: friend.splitAmount,
                };
              }),
            },
          },
        },
        select: {
          id: true,
          createdAt: true,
          updatedAt: true,
          total: true,
          splitPaymentType: true,
          splitType: true,
          splitGroup: {
            select: {
              id: true,
              name: true,
            },
          },
          createdBy: {
            select: {
              id: true,
              name: true,
            },
          },
          SplitPaymentUsers: {
            select: {
              userId: true,
              amount: true,
            },
          },
        },
      });
      return splitPayment;
    } catch (error) {
      throw new Error(error);
    }
  }
}
