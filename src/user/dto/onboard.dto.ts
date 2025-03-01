import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class OnboardDto {
  @IsString()
  residence?: string;

  @IsString()
  vancouverArea?: string;

  @IsString()
  nightlifeType?: string;

  @IsString()
  outingFrequency?: string;

  @IsString()
  favouriteInstrument?: string;

  @IsString()
  drinkOfChoice: string;

  @IsString()
  groupOrAlone?: string;

  @IsString()
  arrivalTime?: string;

  @IsString()
  appealingPromotion?: string;

  @IsString()
  notificationPreference?: string;

  @IsString()
  nighlifeEnvironment?: string;

  @IsString()
  foodImportance?: string;

  @IsString()
  drinkPreference?: string;

  @IsString()
  reasonForNightlife?: string;
}
