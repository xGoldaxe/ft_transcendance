import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import Jwt2FAGuard from 'src/auth/guards/jwt-2fa.guard';
import { ChannelsService } from 'src/prisma/channels/channels.service';
import { UserService } from 'src/prisma/user/user.service';
import { ChannelDTO } from './dto/channel.dto';

@Controller('channels')
@ApiTags('Messages')
@ApiSecurity('access-token')
export class MessagesController {
  constructor(
    private readonly userService: UserService,
    private readonly channelService: ChannelsService,
  ) {}

  @Get('/')
  @UseGuards(Jwt2FAGuard)
  @ApiOperation({
    summary: "Récupérer tous les channels dont l'utilisateur fait parti",
  })
  @ApiOkResponse({
    description: 'Liste de tous les channels dont il fait parti',
  })
  async channels(@Req() req) {
    return await this.userService.usersChannels(req.user);
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
  async createChannel(@Req() req, @Body() channel: ChannelDTO) {
    return await this.channelService.create(
      channel.name,
      channel.type,
      channel.password,
      req.user,
    );
  }
}
