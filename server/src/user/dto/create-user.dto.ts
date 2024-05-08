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

export type CreateUserDtoType = typeof CreateUserDto

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
  name: string | undefined

  @IsOptional()
  @IsString()
  surname: string | undefined

  @IsOptional()
  @IsString()
  phone: string | undefined

  @IsOptional()
  @IsString()
  city: string | undefined

  @IsOptional()
  @IsString()
  street: string | undefined

  @IsOptional()
  @IsString()
  house: string | undefined

  @IsOptional()
  @IsString()
  apartment: string | undefined

  @IsOptional()
  @IsBoolean()
  emailConfirmed: boolean | undefined

  @IsOptional()
  @IsString()
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
  @IsNotEmpty()
  score: string

  @IsString()
  @IsNotEmpty()
  text: string

  @IsString()
  @IsNotEmpty()
  furnitureId: string
}
