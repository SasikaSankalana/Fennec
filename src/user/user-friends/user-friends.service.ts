import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserFriendsService {
  constructor(private prisma: PrismaService) {}

  async getFriend(userId: string, friendId: string) {
    try {
      const existingFriendRequest = await this.prisma.friendRequest.findFirst({
        where: {
          OR: [
            {
              userId: userId,
              friendId: friendId,
            },
            {
              userId: friendId,
              friendId: userId,
            },
          ],
        },
      });

      let status;

      if (existingFriendRequest) {
        status = 'PENDING';
      } else {
        const existingFriend = await this.prisma.friend.findFirst({
          where: {
            OR: [
              {
                userId: userId,
                friendId: friendId,
              },
              {
                userId: friendId,
                friendId: userId,
              },
            ],
          },
        });
        if (existingFriend) {
          status = 'FRIENDS';
        } else {
          status = 'NOT_FRIENDS';
        }
      }

      const user = await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          id: true,
          name: true,
          UserLocation: {
            select: {
              latitude: true,
              longitude: true,
            },
          },
        },
      });
      return { user, status };
    } catch (error) {
      throw error;
    }
  }

  async createFriendRequest(userId: string, friendId: string) {
    try {
      const existingFriend = await this.prisma.friend.findFirst({
        where: {
          OR: [
            {
              userId: userId,
              friendId: friendId,
            },
            {
              userId: friendId,
              friendId: userId,
            },
          ],
        },
      });
      if (existingFriend) {
        throw new BadRequestException('Friend request exists');
      }

      const existingFriendRequests = await this.prisma.friendRequest.findFirst({
        where: {
          OR: [
            {
              userId: userId,
              friendId: friendId,
            },
            {
              userId: friendId,
              friendId: userId,
            },
          ],
        },
      });
      if (existingFriendRequests) {
        throw new BadRequestException('Friend request exists');
      }
      const friendRequest = await this.prisma.friendRequest.create({
        data: {
          userId: userId,
          friendId: friendId,
        },
      });
      return friendRequest;
    } catch (error) {
      throw error;
    }
  }

  async deleteFriendRequest(requestId: string) {
    try {
      const friendRequest = await this.prisma.friendRequest.findUnique({
        where: {
          id: requestId,
        },
      });

      if (friendRequest) {
        await this.prisma.friendRequest.delete({
          where: {
            id: requestId,
          },
        });
        return friendRequest;
      }

      throw new ForbiddenException('No friend request found');
    } catch (error) {
      throw error;
    }
  }

  async getFriendRequests(userId: string) {
    try {
      const friendRequests = await this.prisma.friendRequest.findMany({
        where: {
          friendId: userId,
        },
        select: {
          id: true,
          user: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
      return friendRequests;
    } catch (error) {
      throw error;
    }
  }

  async acceptFriendRequest(requestId: string, dto: any) {
    try {
      const existingFriendRequests = await this.prisma.friendRequest.findUnique(
        {
          where: {
            id: requestId,
          },
          select: {
            userId: true,
            friendId: true,
          },
        },
      );

      if (existingFriendRequests) {
        const friend = await this.prisma.friend.create({
          data: {
            user: {
              connect: {
                id: existingFriendRequests.userId,
              },
            },
            friend: {
              connect: {
                id: existingFriendRequests.friendId,
              },
            },
          },
        });

        await this.prisma.friendRequest.delete({
          where: {
            id: requestId,
          },
        });

        return friend;
      } else {
        throw new ForbiddenException('No friend request found');
      }
    } catch (error) {
      throw error;
    }
  }

  async getFriends(userId: string) {
    try {
      const friends = [];

      const friendList1 = await this.prisma.friend.findMany({
        where: {
          userId: userId,
        },
        select: {
          friend: {
            select: {
              id: true,
              name: true,
              UserLocation: {
                select: {
                  latitude: true,
                  longitude: true,
                },
              },
            },
          },
        },
      });

      friendList1.forEach((friend) => {
        friends.push(friend);
      });

      const friendList2 = await this.prisma.friend.findMany({
        where: {
          friendId: userId,
        },
        select: {
          user: {
            select: {
              id: true,
              name: true,
              UserLocation: {
                select: {
                  latitude: true,
                  longitude: true,
                },
              },
            },
          },
        },
      });

      friendList2.forEach((friend) => {
        friends.push(friend);
      });

      return friends;
    } catch (error) {
      throw error;
    }
  }
}
