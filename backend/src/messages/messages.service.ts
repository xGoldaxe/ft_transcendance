import { Injectable } from '@nestjs/common';
import { ChannelUser, ChannelUserStatus } from '@prisma/client';
import { Channel } from '@prisma/client';

@Injectable()
export class MessagesService {
  hasUserPermission(
    channel: Channel,
    source: ChannelUser,
    target: ChannelUser,
    action: ChannelUserStatus,
  ): boolean {
    if (source.userId == channel.ownerId && target.userId != source.userId)
      return true;

    const gradePermissions = {};
    gradePermissions[ChannelUserStatus.MODERATOR] = [
      ChannelUserStatus.KICK,
      ChannelUserStatus.INVITE,
      ChannelUserStatus.MUTE,
      ChannelUserStatus.USER,
    ];
    gradePermissions[ChannelUserStatus.ADMIN] = [
      ChannelUserStatus.BAN,
      ChannelUserStatus.KICK,
      ChannelUserStatus.MUTE,
      ChannelUserStatus.USER,
      ChannelUserStatus.INVITE,
      ChannelUserStatus.MODERATOR,
    ];

    if (source.state in gradePermissions) {
      const userPermissions = gradePermissions[source.state];
      if (action in userPermissions && target.state in userPermissions)
        return true;
    }
    return false;
  }
}
