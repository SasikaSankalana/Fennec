import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class ReviewDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsInt()
  @IsNotEmpty()
  totalPoints: number;

  @IsInt()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;
}
