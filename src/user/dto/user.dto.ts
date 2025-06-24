import { IsEmail, IsInt, IsString, IsStrongPassword } from "class-validator";

export class UserDto {
    @IsInt()
    id: number;

    @IsString()
    firstName: string;

    @IsString()
    lastName: string;
    @IsString()
    email: string
    @IsInt()
    aGE:number
    @IsStrongPassword()
    password:string
}