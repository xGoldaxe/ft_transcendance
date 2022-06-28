import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import Jwt2FAGuard from 'src/auth/guards/jwt-2fa.guard';
import UserPublic from 'src/prisma/user/user.public.interface';

@Controller('profile')
export class ProfileController {
  @Get()
  @UseGuards(Jwt2FAGuard)
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
