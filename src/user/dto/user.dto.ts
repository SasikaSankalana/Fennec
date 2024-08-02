import { IsInt, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  telephoneNumber: string;

  @IsNotEmpty()
  @IsInt()
  currentPoints: number;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
