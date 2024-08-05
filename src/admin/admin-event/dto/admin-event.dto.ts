import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class AdminEventDto {
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

  @IsString()
  @IsNotEmpty()
  photoUrl: string;
}
