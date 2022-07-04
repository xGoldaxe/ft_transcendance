import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Channel, ChannelType, ChannelUserStatus } from '@prisma/client';
import { verify } from 'argon2';
import Jwt2FAGuard from 'src/auth/guards/jwt-2fa.guard';
import { ChannelsService } from 'src/prisma/channels/channels.service';
import { ChannelInterceptor } from './channel.interceptor';
import { ChannelDTO, ChannelPasswordDTO } from './dto/channel.dto';

@Controller('channels')
@ApiTags('Messages')
@ApiSecurity('access-token')
export class MessagesController {
  constructor(private readonly channelService: ChannelsService) {}

  @Get('/')
  @UseGuards(Jwt2FAGuard)
  @ApiOperation({
    summary: "Récupérer tous les channels dont l'utilisateur fait parti",
  })
  @ApiOkResponse({
    description: 'Liste de tous les channels dont il fait parti',
  })
  async channels(@Req() req) {
    return await this.channelService.channelsForUser(req.user);
  }

  @Post('/')
  @UseGuards(Jwt2FAGuard)
  @ApiOperation({
    summary: 'Créer un channel',
  })
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  @UseInterceptors(ChannelInterceptor)
  async createChannel(@Req() req, @Body() channel: ChannelDTO) {
    return await this.channelService.create(
      channel.name,
      channel.type,
      channel.password,
      req.user,
    );
  }

  @Post('/:id/join')
  @UseGuards(Jwt2FAGuard)
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  @UseInterceptors(ChannelInterceptor)
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
}
