import { IsString, IsOptional } from 'class-validator';

export class MediaDto {
  @IsString()
  id: string;

  @IsOptional()
  @IsString()
  tweet_id?: string;

  @IsString()
  media_type: string;

  @IsString()
  media_url: string;
}
