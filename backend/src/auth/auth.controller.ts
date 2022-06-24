import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IntraAuthGuard } from './intra.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @UseGuards(IntraAuthGuard)
  getLoggedUser(@Request() req) {
    return this.authService.login(req.user);
  }
}
