import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { IntraAuthGuard } from './guards/intra.guard';
import { JwtAuthGuard } from './guards/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @UseGuards(IntraAuthGuard)
  logUser(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('user')
  @UseGuards(JwtAuthGuard)
  getAuthUser(@Request() req): User {
    return req.user;
  }
}
