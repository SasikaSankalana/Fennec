import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class OtpDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsString()
  @IsNotEmpty()
  telephone: string;
}
