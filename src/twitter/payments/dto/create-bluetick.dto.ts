import { IsUUID, IsString } from 'class-validator';
export class CreateBlueTickDto {
  @IsString()
  user_id: string;

  @IsString()
  payment_id: string;
}
