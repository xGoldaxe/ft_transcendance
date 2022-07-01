import { Module } from '@nestjs/common';
import { ChannelsGateway } from './channels.gateway';

@Module({
  providers: [ChannelsGateway],
})
export class MessagesModule {}
