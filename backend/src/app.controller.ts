import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './database/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly user: UserService) {}

  @Get('user/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.user.user({ id: id });
  }
}
