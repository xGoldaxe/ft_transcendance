import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/prisma/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userServer: UserService) {}

  async retrieveUserFromToken(token: string): Promise<any> {
    const user = await this.userServer.user({
      intra_id: token,
    });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
