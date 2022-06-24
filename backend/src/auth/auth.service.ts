import { Injectable } from '@nestjs/common';
import { UserService } from 'src/prisma/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userServer: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async retrieveUserFromToken(data: any): Promise<any> {
    let user = await this.userServer.user({
      intra_id: data.id.toString(),
    });
    if (!user) {
      user = await this.userServer.create(data.login, data.id.toString());
    }
    return user;
  }

  async login(user: any) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
