import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class AddonsDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsInt()
  maxQty: number;
}

export class TicketAddOnsDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => AddonsDto)
  ticketAddOns: AddonsDto[];
}
