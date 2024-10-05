import { IsArray, IsString } from 'class-validator';

export class SplitGroupDto {
  @IsString()
  groupName: string;

  @IsArray()
  @IsString({ each: true })
  friendsList: string[];
}
