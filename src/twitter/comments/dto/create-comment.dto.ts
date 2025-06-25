import { IsNotEmpty, IsString, IsUUID, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsUUID()
  user_id: string;

  @IsInt()
  tweet_id: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
