import { ParseIntPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { NestGateway } from '@nestjs/websockets/interfaces/nest-gateway.interface';
import { Socket } from 'dgram';
import { channel } from 'diagnostics_channel';
import { AuthSocket, WSAuthMiddleware } from 'src/auth/websocket.middleware';
import { ChannelsService } from 'src/prisma/channels/channels.service';
import { UserService } from 'src/prisma/user/user.service';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: 'channels',
  cors: {
    origin: true,
  },
})
export class ChannelsGateway implements NestGateway {
  constructor(
    private readonly channelService: ChannelsService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @WebSocketServer()
  private server: Server;

  afterInit(server) {
    const middle = WSAuthMiddleware(
      this.jwtService,
      this.userService,
      this.configService,
    );
    server.use(middle);
  }

  async handleConnection(client: AuthSocket) {
    const channels = await this.channelService.channelsForUser(client.user);
    channels.forEach((channel) => {
      client.join(`channel-${channel.id}`);
    });
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody('channel', ParseIntPipe) channel_id: number,
    @MessageBody('message') message: string,
    @ConnectedSocket() socket: AuthSocket,
  ) {
    const isUserInChannel = await this.channelService.isUserInChannel(
      channel_id,
      socket.user,
    );
    if (isUserInChannel === false) throw new WsException('User not in channel');
    if (isUserInChannel.muted) throw new WsException('User muted');

    await this.channelService.addMessage(channel_id, socket.user, message);

    socket.broadcast.to(`channel-${channel_id}`).emit('message', {
      channel: channel_id,
      message,
      user: {
        id: socket.user.id,
        name: socket.user.name,
        avatar: socket.user.avatar,
      },
    });
  }
}
