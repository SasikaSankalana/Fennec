import {
  IsEmail,
  IsNotEmpty,
  IsString,
} from "class-validator";

export class OnboardDto {
  @IsString()
  residence?: string;

  @IsString()
  vancouverArea?: string;

  @IsString()
  nightlifeType?: string;

  @IsString()
  outingFreequency?: String;

  @IsString()
  favouriteInstrument?: String;

  @IsString()
  drinkOfChoice: String;

  @IsString()
  groupOrAlone?: String;

  @IsString()
  arrivalTime?: String;

  @IsString()
  appealingPromotion?: String;

  @IsString()
  notificationPreference?: String;

  @IsString()
  nighlifeEnvironment?: String;

  @IsString()
  foodImportance?: String;

  @IsString()
  drinkPreference?: String;

  @IsString()
  reasonForNightlife?: String;

  @IsString()
  @IsNotEmpty()
  username: string;
}
