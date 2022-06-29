import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import Jwt2FAGuard from 'src/auth/guards/jwt-2fa.guard';
import UserPublic from 'src/prisma/user/user.public.interface';
import { EditProfileDTO } from './dto/profile.dto';

@Controller('profile')
@ApiSecurity('access-token')
@ApiTags('Profil')
@UseGuards(Jwt2FAGuard)
export class ProfileController {
  @Get()
  @ApiOperation({
    summary: "Récupérer les informations du profile de l'utilisateur",
  })
  async showPersonnalPage(@Req() req): Promise<UserPublic> {
    return <UserPublic>{
      id: req.user.id,
      name: req.user.name,
      status: req.user.status,
      avatar: req.user.avatar,
      otp_enable: req.user.otp_enable,
    };
  }

  @Put()
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  @ApiOperation({
    summary: "Editer les informations de l'utilisateur connecté",
  })
  @UseInterceptors(FileInterceptor('avatar'))
  async editProfile(
    @Req() req,
    @Body() updateDto: EditProfileDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return;
  }
}
