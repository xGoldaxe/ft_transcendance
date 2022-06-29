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

  @IsString()
  @ApiPropertyOptional({
    name: 'avatar',
    type: 'string',
    format: 'binary',
    description: "Base64 d'une image au format PNG",
    example: `iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`,
  })
  avatar: string;
}
