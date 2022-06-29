import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import {
  ApiExcludeEndpoint,
  ApiForbiddenResponse,
  ApiMovedPermanentlyResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { LocalEnvGuard } from 'src/dev/local-env.guard';
import { UserService } from 'src/prisma/user/user.service';
import { AuthService } from './auth.service';
import AuthDTO from './dto/auth.dto';
import ResponseLoginDTO from './dto/response_login.dto';
import { IntraAuthGuard } from './guards/intra.guard';

@Controller('auth')
@ApiTags('Authentification')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('login')
  @UseGuards(IntraAuthGuard)
  @ApiMovedPermanentlyResponse({
    description:
      "L'utilisateur est redirigé sur l'intra de 42 pour s'authentifier",
  })
  @ApiForbiddenResponse({
    description: "Le code donné par l'utilisateur est incorrect.",
  })
  @ApiOkResponse({
    description: "L'utilisateur est authentifié",
    type: ResponseLoginDTO,
  })
  @ApiOperation({
    summary: "Authentifier l'utilisateur sur l'OAUTH2 de l'intra 42",
  })
  logUser(@Param() authReq: AuthDTO, @Request() req) {
    return this.authService.login(req.user);
  }

  @ApiExcludeEndpoint()
  @Get('tokens')
  @UseGuards(LocalEnvGuard)
  async retrieveUsersToken() {
    const users_tokens = [];

    const users = await this.userService.users();
    users.forEach(async (user) => {
      users_tokens.push({
        user,
        token: await this.authService.login(user, true),
      });
    });
    return users_tokens;
  }
}
