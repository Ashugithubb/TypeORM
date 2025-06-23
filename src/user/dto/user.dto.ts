import { IsEmail, IsInt, IsString } from "class-validator";

export class UserDto {
    @IsInt()
    id: number;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
    @IsString()
    email: string
}