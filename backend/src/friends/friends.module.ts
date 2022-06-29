import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FriendsService } from 'src/prisma/friends/friends.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/prisma/user/user.service';
import { FriendsController } from './friends.controller';
import { StatusGateway } from './status.gateway';

@Module({
  providers: [
    PrismaService,
    FriendsService,
    JwtService,
    UserService,
    StatusGateway,
    StatusGateway,
  ],
  controllers: [FriendsController],
})
export class FriendsModule {}
