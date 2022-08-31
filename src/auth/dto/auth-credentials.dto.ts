import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto{
    @IsString()
    @MinLength(4)
    @MaxLength(25)
    username: string;

    @IsString()
    @MinLength(8)
    @MaxLength(16)
    @Matches(/(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,{
        message: 'password is too weak'
    })
    password: string;
}