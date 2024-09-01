import { Type } from 'class-transformer';
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  telephoneNumber: string;

  @IsString()
  @IsNotEmpty()
  username: string;

  @Type(() => Date)
  @IsNotEmpty()
  dateOfBirth: Date;
}
