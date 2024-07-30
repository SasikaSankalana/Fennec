import { IsNotEmpty, IsNumber } from 'class-validator';

export class locationDto {
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNotEmpty()
  userId: string;
}
