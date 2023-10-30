import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateAuthDto {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  email: string;

  @IsString()
  @MaxLength(60)
  @IsNotEmpty()
  password: string;
}
