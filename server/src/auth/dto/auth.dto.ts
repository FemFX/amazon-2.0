import { IsEmail, MinLength, IsString } from 'class-validator';

export class AuthDto {
  @IsEmail()
  readonly email: string;
  @MinLength(6, {
    message: 'Password must be at lease 6 characters',
  })
  @IsString()
  readonly password: string;
}
