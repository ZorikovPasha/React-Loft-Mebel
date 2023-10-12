import { IsString, IsNotEmpty, MinLength, IsOptional, IsBoolean, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateUserDto {
  @ApiProperty({ example: 'Justin25' })
  @IsString()
  @IsNotEmpty()
  userName: string

  @ApiProperty({ example: 'test45email@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: 'Password123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}

export class LoginUserDto {
  @ApiProperty({ example: 'test45email@gmail.com' })
  @IsString()
  @IsNotEmpty()
  email: string

  @ApiProperty({ example: 'Password123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string | undefined

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  surname: string | undefined

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone: string | undefined

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city: string | undefined

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  street: string | undefined

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  house: string | undefined

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  apartment: string | undefined

  @IsOptional()
  @IsBoolean()
  emailConfirmed: boolean | undefined

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  wantsToReceiveEmailUpdates: string | undefined
}

export class AddFavoriteFurnitureDto {
  @IsNumber()
  id: number
}

export class EditOrderDto {
  @IsNumber()
  orderId: number
}

export class AddCartItemDto {
  @IsNumber()
  productId: number

  @IsNumber()
  quintity: number

  @IsString()
  @IsNotEmpty()
  color: string
}

export class RemoveCartItemDto {
  @IsNumber()
  productId: number

  @IsString()
  @IsNotEmpty()
  color: string
}

export class UserRequestDto {
  @IsString()
  @IsNotEmpty()
  message: string
}

export class MakeReviewDto {
  @IsString()
  score: string

  @IsString()
  @IsNotEmpty()
  text: string

  @IsNumber()
  furnitureId: number
}
