import { Injectable } from '@nestjs/common';
import {
  Channel,
  ChannelType,
  ChannelUserStatus,
  Prisma,
  User,
} from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChannelsService {
  constructor(private readonly prisma: PrismaService) {}

  async channelsForUser(user: User) {
    return this.prisma.channel.findMany({
      where: {
        users: {
          some: {
            userId: user.id,
            NOT: [
              { state: ChannelUserStatus.BAN },
              { state: ChannelUserStatus.KICK },
            ],
          },
        },
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
                id: true,
              },
            },
          },
        },
      },
    });
  }

  async create(name: string, type: ChannelType, password: string, owner: User) {
    let hashedPassword: null | string = null;
    if (type == ChannelType.PROTECTED) {
      hashedPassword = await hash(password);
    }

    return this.prisma.channel.create({
      data: {
        name,
        type,
        owner: {
          connect: {
            id: owner.id,
          },
        },
        users: {
          create: [
            {
              userId: owner.id,
              state: ChannelUserStatus.ADMIN,
            },
          ],
        },
        password: hashedPassword,
      },
      select: {
        id: true,
        type: true,
        name: true,
      },
    });
  }

  async channel(id: number) {
    return this.prisma.channel.findUnique({
      where: {
        id,
      },
      include: {
        users: {
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
                id: true,
              },
            },
          },
        },
      },
    });
  }

  async channelUser(id: number, user: User) {
    return this.prisma.channel.findUnique({
      where: {
        id,
      },
      include: {
        users: {
          where: {
            userId: user.id,
          },
          include: {
            user: {
              select: {
                name: true,
                avatar: true,
                id: true,
              },
            },
          },
        },
      },
    });
  }

  async addUser(channel: Channel, user: User) {
    return this.prisma.channel.update({
      where: {
        id: channel.id,
      },
      data: {
        users: {
          create: [
            {
              userId: user.id,
              state: ChannelUserStatus.USER,
            },
          ],
        },
      },
    });
  }

  async updateUser(
    channel: Channel,
    user: Prisma.ChannelWhereUniqueInput,
    state: ChannelUserStatus,
    endDate?: Date,
  ) {
    return this.prisma.channel.update({
      where: {
        id: channel.id,
      },
      data: {
        users: {
          updateMany: {
            where: {
              userId: user.id,
              channelId: channel.id,
            },
            data: {
              state,
              until: endDate,
            },
          },
        },
      },
    });
  }

  async removeUser(channel: Channel, user: User) {
    return this.prisma.channel.update({
      where: {
        id: channel.id,
      },
      data: {
        users: {
          deleteMany: [
            {
              userId: user.id,
              channelId: channel.id,
            },
          ],
        },
      },
    });
  }
}
