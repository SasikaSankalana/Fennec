import { IsBoolean, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class RedeemPromotionDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  userAccountId: string;

  @IsInt()
  @IsNotEmpty()
  requiredPoints: number;

  @IsString()
  @IsNotEmpty()
  promotionId: string;

  @IsString()
  @IsNotEmpty()
  functionId: string;

  @IsBoolean()
  @IsNotEmpty()
  isEvent: boolean;
}
