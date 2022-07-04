import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ChannelType } from '@prisma/client';
import { IsEnum, IsString, ValidateIf } from 'class-validator';

export class ChannelDTO {
  @IsString()
  @ApiProperty({
    example: 'Nom de channel',
  })
  name: string;

  @IsEnum(ChannelType)
  @ApiProperty({
    example: 'PUBLIC',
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
