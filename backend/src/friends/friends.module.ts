import { Module } from '@nestjs/common';
import { FriendsService } from 'src/prisma/friends/friends.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/prisma/user/user.service';
import { FriendsController } from './friends.controller';

@Module({
  providers: [PrismaService, FriendsService, UserService],
  controllers: [FriendsController],
})
export class FriendsModule {}
