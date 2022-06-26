import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/prisma/user/user.service';
import { AuthService } from '../auth.service';
import { JwtAuthGuard } from '../guards/jwt.guard';
import { DoublefaService } from './doublefa.service';
import { TwoFACode } from './dto/twoFACode.dto';

@Controller('auth/2fa')
@UseInterceptors(ClassSerializerInterceptor)
export class DoublefaController {
  constructor(
    private readonly twoFAService: DoublefaService,
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('generate')
  @UseGuards(JwtAuthGuard)
  async register(@Res() response, @Req() request) {
    if (request.user.otp_enable)
      throw new HttpException('Already Enabled', HttpStatus.FORBIDDEN);
    const { url } = await this.twoFAService.generateTwoFASecret(request.user);
    return this.twoFAService.pipeQrCodeStream(response, url);
  }

  @Post('enable')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async turnOn(@Req() request, @Body() { code }: TwoFACode) {
    if (!request.user.otp_secret)
      throw new HttpException('No 2FA Code given', HttpStatus.BAD_REQUEST);

    const isCodeValid = await this.twoFAService.isTwoFAValid(
      code,
      request.user,
    );
    if (!isCodeValid)
      throw new UnauthorizedException('Wrong authentication code');
    await this.userService.turnOnTwoFA(request.user.id);
  }

  @Post('authenticate')
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async authenticate(
    @Req() request,
    @Body() { code }: TwoFACode,
  ): Promise<any> {
    const isCodeValid = await this.twoFAService.isTwoFAValid(
      code,
      request.user,
    );

    if (!isCodeValid && this.configService.get('ENV') != 'local')
      throw new UnauthorizedException('Wrong authentication code');
    return this.authService.login(request.user, true);
  }
}
