import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class GoogleAuthDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  firstName?: string;

  @IsNotEmpty()
  @IsString()
  lastName?: string;

  @IsNotEmpty()
  @IsString()
  picture?: string;
}
