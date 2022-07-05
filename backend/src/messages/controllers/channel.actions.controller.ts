import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  HttpException,
  HttpStatus,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ChannelType, ChannelUserStatus } from '@prisma/client';
import { verify } from 'argon2';
import Jwt2FAGuard from 'src/auth/guards/jwt-2fa.guard';
import { ChannelsService } from 'src/prisma/channels/channels.service';
import { ChannelPasswordInterceptor } from '../interceptors/channelPassword.interceptor';
import { ChannelPasswordDTO, UserRoleDTO } from '../dto/channel.dto';
import { MessagesService } from '../messages.service';

@Controller('channels')
@UseGuards(Jwt2FAGuard)
@ApiTags('Messages')
@ApiSecurity('access-token')
export class ChannelActionController {
  constructor(
    private readonly channelService: ChannelsService,
    private readonly messageService: MessagesService,
  ) {}

  @Post('/:id/join')
  @UseInterceptors(ChannelPasswordInterceptor)
  @ApiOperation({
    summary: 'Rejoindre un channel',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
    description: 'ID du channel à rejoindre',
  })
  @ApiOkResponse({
    description: "L'utilisateur a été ajouté au canal",
  })
  @ApiForbiddenResponse({
    description:
      "L'utilisateur doit saisir un mot de passe pour rejoindre ce canal",
  })
  @ApiUnauthorizedResponse({
    description: "L'utilisateur n'a pas été invité à rejoindre ce canal",
  })
  async joinChannel(
    @Req() req,
    @Param('id', ParseIntPipe) id,
    @Body() password_ch: ChannelPasswordDTO,
  ) {
    const channel = await this.channelService.channel(id);
    if (!channel)
      throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
    const isUserInChannel = channel.users.filter(
      (u) => u.user.id == req.user.id,
    );
    if (isUserInChannel.length == 1) {
      const userChannel = isUserInChannel[0];

      switch (userChannel.state) {
        case ChannelUserStatus.BAN:
          if (userChannel.until >= new Date())
            throw new HttpException(
              'User was banned from this channel.',
              HttpStatus.UNAUTHORIZED,
            );
          else await this.channelService.removeUser(channel, req.user);
          break;

        case ChannelUserStatus.INVITE:
          this.channelService.updateUser(
            channel,
            req.user,
            ChannelUserStatus.USER,
          );
          return channel;

        default:
          return channel;
      }
    }

    if (channel.type == ChannelType.PRIVATE)
      throw new HttpException(
        'User is not invited to this channel.',
        HttpStatus.UNAUTHORIZED,
      );

    if (channel.type == ChannelType.PROTECTED) {
      if (!(await verify(channel.password, password_ch.password)))
        throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);
    }

    await this.channelService.addUser(channel, req.user);
    return await this.channelService.channel(id);
  }

  @Delete('/:id/leave')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'ID du channel à quitter',
  })
  @ApiOperation({
    summary: 'Quitter un channel',
  })
  @ApiOkResponse({
    description: "L'utilisateur a quitté le channel",
  })
  @ApiForbiddenResponse({
    description:
      "L'utilisateur est l'owner du channel, il doit supprimer le channel pour le quitter.",
  })
  @ApiNotFoundResponse({
    description: "L'utilisateur n'est pas dans le channel",
  })
  async leaveChannel(@Req() req, @Param('id', ParseIntPipe) id: number) {
    const channel = await this.channelService.channelUser(id, req.user);
    if (!channel)
      throw new HttpException('Channel not found', HttpStatus.NOT_FOUND);
    if (channel.users.length < 1)
      throw new HttpException('User not in the channel', HttpStatus.NOT_FOUND);

    const userChannel = channel.users[0];

    if (channel.ownerId == req.user.id)
      throw new HttpException(
        'User is the owner of the channel',
        HttpStatus.UNAUTHORIZED,
      );

    if (userChannel.state == ChannelUserStatus.MUTE)
      await this.channelService.updateUser(
        channel,
        req.user,
        ChannelUserStatus.BAN,
      );
    else await this.channelService.removeUser(channel, req.user);

    return 'ok';
  }

  @Put('/:id/role')
  @ApiParam({
    name: 'id',
    type: 'number',
    required: true,
    description: 'ID du channel',
  })
  @ApiOperation({
    summary: "Changer le rôle d'un utilisateur",
  })
  @ApiNotFoundResponse({
    description: 'Le channel est introuvable',
  })
  @ApiOkResponse({
    description: "L'utilisateur a été changé de rôle",
  })
  @ApiForbiddenResponse({
    description: "L'utilisateur n'a pas la permission de faire ça",
  })
  async setUserRole(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() userForm: UserRoleDTO,
  ) {
    const channel = await this.channelService.channel(id);
    if (!channel) throw new NotFoundException();

    const chanReqUsers = channel.users.filter((u) => u.user.id == req.user.id);
    const chanTargetUsers = channel.users.filter(
      (u) => u.user.id == userForm.userID,
    );

    if (chanReqUsers.length != 1) throw new UnauthorizedException();
    if (chanTargetUsers.length != 1) throw new NotFoundException();
    const chanReqUser = chanReqUsers[0];
    const chanTargetUser = chanTargetUsers[0];

    if (chanTargetUser.state == ChannelUserStatus.INVITE)
      throw new ForbiddenException();

    if (
      this.messageService.hasUserPermission(
        channel,
        chanReqUser,
        chanTargetUser,
        userForm.role,
      )
    ) {
      await this.channelService.updateUser(
        channel,
        chanTargetUser.user,
        userForm.role,
      );
      return 'ok';
    }
    throw new ForbiddenException();
  }
}
