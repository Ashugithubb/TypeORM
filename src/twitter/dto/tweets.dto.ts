import { IsInt, IsOptional, IsString } from 'class-validator';

export class TweetDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  user_id: string;

  @IsOptional()
  @IsString()
  content?: string;
}
