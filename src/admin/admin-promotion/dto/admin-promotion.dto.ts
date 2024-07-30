import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class AdminPromotionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Date)
  @IsNotEmpty()
  startDate: Date;

  @Type(() => Date)
  @IsNotEmpty()
  endDate: Date;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsInt()
  pointsRequired: number;

  @IsString()
  @IsNotEmpty()
  clubId: string;
}
