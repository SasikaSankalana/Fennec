import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

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
}
