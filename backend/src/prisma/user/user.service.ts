import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, Status, User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async users(): Promise<User[] | null> {
    return this.prisma.user.findMany();
  }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async create(name: string, intra_id: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        name: name,
        intra_id: intra_id,
      },
    });
  }
  async setTwoFASecret(secret: string, id: number): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        otp_secret: secret,
      },
    });
  }
  async turnOnTwoFA(id: number): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        otp_enable: true,
      },
    });
  }
  async updateStatus(user: User, status: Status) {
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        status: status,
      },
    });
  }
}
