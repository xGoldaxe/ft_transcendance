import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserService } from './user/user.service';
import { FriendsService } from './friends/friends.service';
import { ChannelsService } from './channels/channels.service';

@Module({
  providers: [PrismaService, UserService, FriendsService, ChannelsService],
  exports: [UserService],
})
export class PrismaModule {}
