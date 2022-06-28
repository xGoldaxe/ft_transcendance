import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserService } from './user/user.service';
import { FriendsService } from './friends/friends.service';

@Module({
  providers: [PrismaService, UserService, FriendsService],
  exports: [UserService],
})
export class PrismaModule {}
