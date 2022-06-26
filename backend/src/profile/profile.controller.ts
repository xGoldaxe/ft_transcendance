import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import Jwt2FAGuard from 'src/auth/guards/jwt-2fa.guard';

@Controller('profile')
export class ProfileController {
  @Get()
  @UseGuards(Jwt2FAGuard)
  async showPersonnalPage(@Req() req): Promise<any> {
    return req.user;
  }
}
