import { IsNotEmpty, IsString } from 'class-validator';

export class RedeemPromotionDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  requiredPoints: number;

  @IsString()
  @IsNotEmpty()
  promotionId: string;

  @IsString()
  @IsNotEmpty()
  eventId: string;
}
