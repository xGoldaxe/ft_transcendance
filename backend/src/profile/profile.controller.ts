import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import Jwt2FAGuard from 'src/auth/guards/jwt-2fa.guard';
import UserPublic from 'src/prisma/user/user.public.interface';

@Controller('profile')
@ApiSecurity('access-token')
@ApiTags('Profil')
export class ProfileController {
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
}
