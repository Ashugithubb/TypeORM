import { IsUUID, IsInt } from 'class-validator';
export class CreateLikeDto {
  @IsUUID()
  user_id: string;

  @IsInt()
  tweet_id: number;
}
