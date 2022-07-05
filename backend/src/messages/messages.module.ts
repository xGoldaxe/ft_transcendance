import { Module } from '@nestjs/common';
import { ChannelsService } from 'src/prisma/channels/channels.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/prisma/user/user.service';
import { ChannelsGateway } from './channels.gateway';
import { ChannelCrudController } from './controllers/channel.crud.controller';
import { ChannelActionController } from './controllers/channel.actions.controller';
import { MessagesService } from './messages.service';

@Module({
  providers: [
    ChannelsGateway,
    PrismaService,
    UserService,
    ChannelsService,
    MessagesService,
  ],
  controllers: [ChannelCrudController, ChannelActionController],
})
export class MessagesModule {}
