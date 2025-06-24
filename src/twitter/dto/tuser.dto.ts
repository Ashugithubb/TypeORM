import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
