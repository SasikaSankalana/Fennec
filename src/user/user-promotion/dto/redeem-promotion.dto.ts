import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RedeemPromotionDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsInt()
  @IsNotEmpty()
  requiredPoints: number;

  @IsString()
  @IsNotEmpty()
  functionId: string;

  @IsBoolean()
  @IsNotEmpty()
  isEvent: boolean;
}
