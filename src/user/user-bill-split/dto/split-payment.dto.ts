import { splitpaymentType, splitType } from '@prisma/client';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SplitPaymentDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  splitPaymentType: splitpaymentType;

  @IsString()
  @IsNotEmpty()
  splitType: splitType;

  @IsString()
  @IsNotEmpty()
  splitGroupId?: string;

  @IsNotEmpty()
  friendsList: FriendsListDto[];
}

export class FriendsListDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  splitAmount: number;
}
