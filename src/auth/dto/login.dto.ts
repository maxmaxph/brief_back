import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  password: string;
}
