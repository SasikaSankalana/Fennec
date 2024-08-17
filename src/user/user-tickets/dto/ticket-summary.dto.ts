import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class TicketSummaryDto {
  @IsString()
  @IsNotEmpty()
  isEvent: boolean;

  @IsNotEmpty()
  ticketTiers: TicketTierDto[];

  @IsNotEmpty()
  ticketaddOns: TicketAddOnsDto[];

  @IsString()
  @IsNotEmpty()
  functionId: string;
}

export class TicketTierDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  qty: number;
}

export class TicketAddOnsDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  qty: number;
}
