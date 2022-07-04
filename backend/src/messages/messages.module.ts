import { Module } from '@nestjs/common';
import { ChannelsService } from 'src/prisma/channels/channels.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/prisma/user/user.service';
import { ChannelsGateway } from './channels.gateway';
import { MessagesController } from './messages.controller';

@Module({
  providers: [ChannelsGateway, PrismaService, UserService, ChannelsService],
  controllers: [MessagesController],
})
export class MessagesModule {}
