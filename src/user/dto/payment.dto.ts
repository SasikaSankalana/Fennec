import {
  IsDateString,
  IsNotEmpty,
  IsNumberString,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class paymentDetailsDto {
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @IsNumberString()
  @Length(16, 16)
  cardNumber: string;

  @IsString()
  expiryDate: string;

  @IsString()
  @IsNotEmpty()
  cardHolderName: string;

  @IsNumberString()
  @Length(3, 4)
  cvc: string;
}
