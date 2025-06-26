import { IsUUID, IsInt, IsString } from 'class-validator';
export class CreateLikeDto {
  @IsString()
  user_id: string;

  @IsInt()
  tweet_id: number;
}
