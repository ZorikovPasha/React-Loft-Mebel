import { ApiExtraModels, ApiProperty, getSchemaPath } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'

export class CreateFurnitureDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  type: string

  @IsString()
  @IsNotEmpty()
  priceOld: string

  @IsString()
  @IsNotEmpty()
  priceNew: string

  @IsString()
  @IsNotEmpty()
  colors: string

  @IsString()
  @IsNotEmpty()
  rating: string

  @IsString()
  @IsNotEmpty()
  sale: string

  @IsString()
  @IsNotEmpty()
  room: string

  @IsString()
  @IsNotEmpty()
  material: string

  @IsString()
  @IsNotEmpty()
  brand: string

  @IsString()
  @IsNotEmpty()
  dimensions: string

  @IsString()
  @IsNotEmpty()
  specs: string

  @IsString()
  @IsNotEmpty()
  description: string
}

export class SuccessfullRes {
  @ApiProperty({ example: true })
  success: boolean
}

export const apiResponse200 = {
  description: 'Success',
  schema: {
    $ref: getSchemaPath(SuccessfullRes)
  }
}

class FurnitureDimension {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 1 })
  furnitureId: number

  @ApiProperty({ example: 100 })
  width: number

  @ApiProperty({ example: 100 })
  length: number

  @ApiProperty({ example: 100 })
  height: number
}

class Image {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'stella sonoma.png' })
  name: string

  @ApiProperty({ example: 'Picture of a dog' })
  alternativeText: string

  @ApiProperty({ example: 'Picture of a dog' })
  caption: string

  @ApiProperty({ example: 100 })
  width: number

  @ApiProperty({ example: 100 })
  height: number

  @ApiProperty({ example: '4532f3d9ba41718a9eff35fc94c14a49' })
  hash: string

  @ApiProperty({ example: 'png' })
  ext: string

  @ApiProperty({ example: 100 })
  size: number

  @ApiProperty({ example: '/uploads/stella_sonoma_4532f3d9ba41718a9eff35fc94c14a49.png' })
  url: string

  @ApiProperty({ example: 'image/png' })
  mime: string

  @ApiProperty({ example: 'database' })
  provider: string

  @ApiProperty({ example: '2023-09-04T20:30:38.292Z' })
  createdAt: string

  @ApiProperty({ example: '2023-09-04T20:30:38.292Z' })
  updatedAt: string
}

class ReviewUser {
  @ApiProperty({ example: 'Ellen' })
  userName: string | undefined

  @ApiProperty({ type: 'object', nullable: true, oneOf: [{ $ref: getSchemaPath(Image) }] })
  image: typeof Image | null
}

class FurnitureReview {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 'This is actually a good product! I love it!' })
  text: string

  @ApiProperty({ example: 4 })
  score: number

  @ApiProperty({ example: 1 })
  furnitureId: number

  @ApiProperty({ type: 'object', oneOf: [{ $ref: getSchemaPath(ReviewUser) }] })
  user: typeof ReviewUser

  @ApiProperty({ type: 'array', oneOf: [{ $ref: getSchemaPath(Image) }] })
  attachedPictures: (typeof Image)[]

  @ApiProperty({ example: '2023-09-05T21:40:29.885Z' })
  createdAt: string

  @ApiProperty({ example: '2023-09-05T21:40:29.885Z' })
  updatedAt: string
}

@ApiExtraModels(FurnitureDimension, Image, FurnitureReview, ReviewUser)
export class FurnitureRes {
  @ApiProperty({ example: 1 })
  id: number

  @ApiProperty({ example: 1 })
  imageId: number

  @ApiProperty({ example: 'Stella sonoma' })
  name: string

  @ApiProperty({ example: 'set' })
  type: string

  @ApiProperty({ example: '100' })
  priceOld: string

  @ApiProperty({ example: '90' })
  priceNew: string

  @ApiProperty({ example: '#eee2e2' })
  colors: string[]

  @ApiProperty({ example: '3.2' })
  rating: string

  @ApiProperty({ example: true })
  sale: boolean

  @ApiProperty({ example: 'living' })
  room: string

  @ApiProperty({ example: 'wood' })
  material: string

  @ApiProperty({ example: 'Sonoma' })
  brand: string

  @ApiProperty({ example: 'Laconic lines and simple shapes' })
  description: string

  @ApiProperty({
    example:
      'Size:118 × 95 × 90 (Length × Width × Height); Frame:solid wood, plywood, fiberboard, spring snake; Leg material:array;'
  })
  specs: string

  @ApiProperty({ type: 'object', nullable: true, oneOf: [{ $ref: getSchemaPath(Image) }] })
  image: typeof Image | null

  @ApiProperty({ type: 'array', oneOf: [{ $ref: getSchemaPath(FurnitureDimension) }] })
  dimensions: (typeof FurnitureDimension)[]

  @ApiProperty({ type: 'array', oneOf: [{ $ref: getSchemaPath(FurnitureReview) }] })
  reviews: (typeof FurnitureReview)[]
}
