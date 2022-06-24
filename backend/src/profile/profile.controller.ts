import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { IntraAuthGuard } from 'src/auth/intra.guard';

@Controller('profile')
export class ProfileController {
  @Get()
  @UseGuards(IntraAuthGuard)
  async showPersonnalPage(@Req() req): Promise<any> {
    return req.user;
  }
}
