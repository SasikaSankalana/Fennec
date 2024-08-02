import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  name?: string;
  photoUrl?: string;
  telephoneNumber?: string;
}
