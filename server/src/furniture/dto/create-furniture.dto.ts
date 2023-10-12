import { IsString, IsNotEmpty } from 'class-validator';

export class CreateFurnitureDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  priceOld: string;

  @IsString()
  @IsNotEmpty()
  priceNew: string;

  @IsString()
  @IsNotEmpty()
  colors: string;

  @IsString()
  @IsNotEmpty()
  rating: string;

  @IsString()
  @IsNotEmpty()
  sale: string;

  @IsString()
  @IsNotEmpty()
  room: string;

  @IsString()
  @IsNotEmpty()
  material: string;

  @IsString()
  @IsNotEmpty()
  brand: string;

  @IsString()
  @IsNotEmpty()
  dimensions: string;
}
