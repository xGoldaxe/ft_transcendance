import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class FriendsService {
  constructor(private readonly prismaService: PrismaService) {}

  async friends(user: User) {
    return this.prismaService.friendShip.findMany({
      where: {
        OR: [{ requester: user }, { receiver: user }],
      },
    });
  }

  async pendingRequests(user: User) {
    return this.prismaService.friendShip.findMany({
      where: {
        OR: [{ requester: user }, { receiver: user }],
      },
    });
  }

  async friendsWith(user1: User, user2: User) {
    return this.prismaService.friendShip.findFirst({
      where: {
        OR: [
          {
            AND: [{ requester: user1 }, { receiver: user2 }],
          },
          {
            AND: [{ requester: user1 }, { receiver: user2 }],
          },
        ],
      },
      select: {
        status: true,
      },
    });
  }
}
