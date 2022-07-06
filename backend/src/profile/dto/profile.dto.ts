import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EditProfileDTO {
  @IsString()
  @ApiProperty({
    name: 'name',
    description: "Nouveau nom de l'uilisateur",
    example: 'pleveque',
  })
  name: string;

  @ApiPropertyOptional({
    name: 'avatar',
    description: "Nouvelle image de profile de l'utilisateur",
    type: 'file',
  })
  avatar;
}
