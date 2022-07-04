import { Injectable } from '@nestjs/common';
import { ChannelType, ChannelUserStatus, User } from '@prisma/client';
import { hash } from 'argon2';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ChannelsService {
  constructor(private readonly prisma: PrismaService) {}

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
}
