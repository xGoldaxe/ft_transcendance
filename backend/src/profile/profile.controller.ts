import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { FriendShipStatus } from '@prisma/client';
import Jwt2FAGuard from 'src/auth/guards/jwt-2fa.guard';
import { FriendsService } from 'src/prisma/friends/friends.service';
import UserPublic from 'src/prisma/user/user.public.interface';
import { UserService } from 'src/prisma/user/user.service';

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
      "Récupérer la liste des demandes, bloquages et des amis de l'utilisateur",
  })
  @ApiOkResponse({
    description: "Contient la liste d'ami de l'utilisateur",
  })
  async getFriends(@Req() req) {
    return this.friends.friends(req.user);
  }

  @Get('/friends/:id')
  @UseGuards(Jwt2FAGuard)
  @ApiOperation({
    summary: 'Récupérer le lien avec un autre utilisateur',
  })
  @ApiOkResponse({
    description: "Contient la relation avec l'utilisateur spécifié",
    content: {
      'application/json': {
        schema: {
          type: 'string',
          enum: Object.values(FriendShipStatus),
        },
      },
    },
  })
  @ApiBadRequestResponse({
    description: "L'utilisateur a demandé la relation avec son profile...",
  })
  @ApiNotFoundResponse({
    description: 'Utilisateur spécifié introuvable',
  })
  @ApiParam({
    name: 'id',
    required: true,
    type: 'number',
  })
  async getFriend(@Param('id') id: number, @Req() req) {
    if (id == req.user.id)
      throw new HttpException(
        'Vous ne pouvez pas être amis avec vous même...',
        HttpStatus.BAD_REQUEST,
      );
    const user = await this.users.user({ id: id });
    if (!user)
      throw new HttpException("User doesn't exists", HttpStatus.NOT_FOUND);
    return this.friends.friendsWith(req.user, user);
  }
}
