import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
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
import { FriendsService } from 'src/prisma/friends/friends.service';
import UserPublic from 'src/prisma/user/user.public.interface';
import { UserService } from 'src/prisma/user/user.service';
import { FriendStatusDTO } from './dto/friends-status.dto';

@Controller('profile')
@ApiSecurity('access-token')
@ApiTags('Profil')
export class ProfileController {
  constructor(
    private readonly friends: FriendsService,
    private readonly users: UserService,
  ) {}

  @Get()
  @UseGuards(Jwt2FAGuard)
  @ApiOperation({
    summary: "Récupérer les informations du profile de l'utilisateur",
  })
  async showPersonnalPage(@Req() req): Promise<UserPublic> {
    return <UserPublic>{
      id: req.user.id,
      name: req.user.name,
      status: req.user.status,
      avatar: req.user.avatar,
      otp_enable: req.user.otp_enable,
    };
  }

  @Get('/friends')
  @UseGuards(Jwt2FAGuard)
  @ApiOperation({
    summary:
      "Récupérer la liste des demandes, bloquages et des amis de l'utilisateur, ou le lien avec un autre utilisateur",
  })
  @ApiOkResponse({
    description:
      "Contient la liste d'ami de l'utilisateur, ou sa relation avec l'utilisateur spécifié",
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFriends(@Body() friendsQuery: FriendStatusDTO, @Req() req) {
    if (!friendsQuery.friend) return this.friends.friends(req.user);
    if (friendsQuery.friend == req.user.id)
      throw new HttpException(
        'Vous ne pouvez pas être amis avec vous même...',
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.users.user({ id: friendsQuery.friend });
    if (!user)
      throw new HttpException("User doesn't exists", HttpStatus.NOT_FOUND);
    return this.friends.friendsWith(req.user, user);
  }
}
