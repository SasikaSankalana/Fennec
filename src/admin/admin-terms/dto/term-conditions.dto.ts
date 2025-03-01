import { IsNotEmpty, IsString } from 'class-validator';

export class TermsAndConditionsDto {
  @IsString()
  @IsNotEmpty()
  terms: string;
}
