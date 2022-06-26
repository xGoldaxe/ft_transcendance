import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { IntraAuthGuard } from './guards/intra.guard';
import Jwt2FAGuard from './guards/jwt-2fa.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @UseGuards(IntraAuthGuard)
  logUser(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('user')
  @UseGuards(Jwt2FAGuard)
  getAuthUser(@Request() req): User {
    return req.user;
  }
}
