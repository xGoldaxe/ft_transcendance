import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IntraAuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(IntraAuthGuard)
  async getLoggedUser(@Req() req): Promise<any> {
    return req.user;
  }
}
