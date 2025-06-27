import { IsNotEmpty, IsString, IsUUID, IsInt } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  user_id: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}
