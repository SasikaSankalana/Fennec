import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from 'class-validator';

export class AdminClubDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  locationName: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumberString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  country: string;

  @IsString()
  @IsNotEmpty()
  clubOwnerId: string;

  @IsInt()
  @IsNotEmpty()
  capacity: number;
}
