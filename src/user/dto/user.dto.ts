import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  telephoneNumber: string;
}
