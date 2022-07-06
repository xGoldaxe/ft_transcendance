import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiConsumes,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProduces,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { createReadStream, unlink } from 'fs';
import multer from 'multer';
import path from 'path';
import Jwt2FAGuard from 'src/auth/guards/jwt-2fa.guard';
import UserPublic from 'src/prisma/user/user.public.interface';
import { UserService } from 'src/prisma/user/user.service';
import { EditProfileDTO } from './dto/profile.dto';
import * as mime from 'mime-types';

@Controller('profile')
@ApiSecurity('access-token')
@ApiTags('Profil')
@UseGuards(Jwt2FAGuard)
export class ProfileController {
  constructor(private readonly userService: UserService) {}

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

  @Post()
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiOperation({
    summary: "Editer les informations de l'utilisateur connecté",
  })
  @UseInterceptors(
    FileInterceptor('avatar', {
      limits: {
        files: 1,
        fileSize: 5000000,
      },
      fileFilter: function (req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();
        const mimetyp = file.mimetype;
        if (
          extension !== '.jpg' &&
          extension !== '.jpeg' &&
          extension !== '.png' &&
          mimetyp !== 'image/png' &&
          mimetyp !== 'image/jpg' &&
          mimetyp !== 'image/jpeg'
        ) {
          cb(new BadRequestException('Uploaded file is not an image'), true);
        }
        cb(null, true);
      },
      storage: multer.diskStorage({
        destination: './uploads/user/',
        filename: function (req, file, callback) {
          callback(
            null,
            `${file.fieldname}_${Date.now()}${path
              .extname(file.originalname)
              .toLowerCase()}`,
          );
        },
      }),
    }),
  )
  async editProfile(
    @Req() req,
    @Body() updateDto: EditProfileDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    let newImage = req.user.avatar;
    if (file && file.size > 0) {
      if (req.user.avatar)
        unlink(path.join(process.cwd(), req.user.avatar), null);
      newImage = path.join(file.destination, file.filename);
    }

    let newPseudo = req.user.name;
    if (updateDto.name && updateDto.name != newPseudo) {
      const userSameName = await this.userService.user({
        name: updateDto.name,
      });
      if (userSameName)
        throw new BadRequestException({ name: 'Name already used' });
      newPseudo = updateDto.name;
    }

    if (newImage == req.user.avatar && newPseudo == req.user.name)
      throw new BadRequestException();

    req.user.name = newPseudo;
    req.user.avatar = newImage;
    await this.userService.updateUser(req.user);
    return 'ok';
  }

  @Get('/:name/avatar')
  @ApiOperation({
    summary: "Récupérer l'avatar d'un utilisateur",
  })
  @ApiProduces('image/png', 'image/jpeg')
  @ApiParam({
    name: 'name',
    required: true,
    type: 'string',
    description: 'name du user auquel il faut afficher la photo',
  })
  @ApiOkResponse({
    content: {
      'image/png': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
      'image/jpeg': {
        schema: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Utilisateur inexistant',
  })
  async getAvatar(@Param('name') name, @Res() res) {
    const user = await this.userService.user({
      name,
    });
    if (!user) throw new NotFoundException();

    if (!user.avatar) return '';

    const file = createReadStream(path.join(process.cwd(), user.avatar));
    res.set({
      'Content-Type': mime.lookup(user.avatar) || 'application/octet-stream',
    });
    file.pipe(res);
  }
}
