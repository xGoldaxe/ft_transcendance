import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ChannelType, ChannelUserStatus } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  ValidateIf,
} from 'class-validator';

export class ChannelDTO {
  @IsString()
  @ApiProperty({
    example: 'Nom de channel',
  })
  name: string;

  @IsEnum(ChannelType)
  @ApiProperty({
    example: ChannelType.PUBLIC,
    enum: ChannelType,
  })
  type: ChannelType;

  @IsString()
  @ValidateIf((o) => o.type == ChannelType.PROTECTED)
  @ApiPropertyOptional({
    required: false,
    description: 'Nécessaire si le channel est protégé',
  })
  password: string;
}

export class ChannelPasswordDTO {
  @IsString()
  @ApiPropertyOptional({
    required: false,
    description: 'Nécessaire si le channel est protégé',
  })
  password: string;
}

export class UserRoleDTO {
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: "L'ID de l'utilisateur",
    required: true,
  })
  userID: number;

  @IsEnum(ChannelUserStatus)
  @ApiProperty({
    example: ChannelUserStatus.MODERATOR,
    enum: ChannelUserStatus,
    required: true,
  })
  role: ChannelUserStatus;

  @IsDateString()
  @ValidateIf(
    (o) => o.role == ChannelUserStatus.BAN || o.role == ChannelUserStatus.MUTE,
  )
  @ApiPropertyOptional({
    required: false,
    description: 'Date à laquelle se finit la punission',
  })
  password: string;
}
