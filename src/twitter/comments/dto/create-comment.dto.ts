import { IsNotEmpty, IsString, IsUUID, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  user_id: string;

  @IsInt()
  tweet_id: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
