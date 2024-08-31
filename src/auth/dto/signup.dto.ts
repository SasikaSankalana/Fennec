import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name?: string;

  @IsString()
  @IsNotEmpty()
  telephoneNumber?: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  dateOfBirth: Date;

  @IsNumber()
  latitude: number;

  @IsNumber()
  longitude: number;

  @IsString()
  paymentMethodId: string;
}
