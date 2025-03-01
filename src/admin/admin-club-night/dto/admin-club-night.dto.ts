import { MulterField } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminClubNightDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Date)
  @IsNotEmpty()
  dateTime: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  clubId: string;

  @IsNotEmpty()
  photoUrl: MulterField;
}
