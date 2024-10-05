import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class TierDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsInt()
  @IsNotEmpty()
  totalQuantity: number;

  @IsBoolean()
  @IsNotEmpty()
  isPrivate: boolean;
}

export class TicketTiersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TierDto)
  ticketTiers: TierDto[];
}
