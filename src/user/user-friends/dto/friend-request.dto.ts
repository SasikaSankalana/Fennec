import { IsString, IsNotEmpty } from 'class-validator';

export class FriendRequestDto {
  @IsString()
  @IsNotEmpty()
  friendId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;
}
