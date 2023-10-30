import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProductDto {
  @MaxLength(100)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  category_id: number;
}
