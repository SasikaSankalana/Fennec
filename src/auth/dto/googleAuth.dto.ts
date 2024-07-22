import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class GoogleAuthDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  photoUrl: string;
}
