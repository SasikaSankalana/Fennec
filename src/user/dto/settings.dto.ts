import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class userSettingsDto {
  @IsBoolean()
  @IsNotEmpty()
  groupInvitations: boolean;

  @IsBoolean()
  @IsNotEmpty()
  accountActivity: boolean;

  @IsBoolean()
  @IsNotEmpty()
  updatesAndEnhancements: boolean;

  @IsBoolean()
  @IsNotEmpty()
  enableNotifications: boolean;

  @IsBoolean()
  @IsNotEmpty()
  enableSounds: boolean;

  @IsBoolean()
  @IsNotEmpty()
  enableRewards: boolean;
}
