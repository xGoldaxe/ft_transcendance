import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import AuthDTO from './dto/auth.dto';
import { IntraAuthGuard } from './guards/intra.guard';

@Controller('auth')
@ApiTags('Authentification')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @UseGuards(IntraAuthGuard)
  @ApiResponse({
    status: HttpStatus.TEMPORARY_REDIRECT,
    description:
      "L'utilisateur est redirigé sur l'intra de 42 pour s'authentifier",
  })
  logUser(@Param() authReq: AuthDTO, @Request() req) {
    return this.authService.login(req.user);
  }
}
