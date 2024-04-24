import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  BadRequestException,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  Query
} from '@nestjs/common'
import { FurnitureService } from './furniture.service'
import { CreateFurnitureDto, FurnitureRes, apiResponse200 } from './dto/create-furniture.dto'
import { UtilsService } from '../utils/utils.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'
import { ICreateFurniture, IGetFurnitureRes } from './types'

export interface IFurnitureDimension {
  width: number
  length: number
  height: number
}

@ApiTags('Furniture')
@ApiExtraModels(FurnitureRes)
@Controller('api/furniture')
export class FurnitureController {
  constructor(
    private readonly furnitureService: FurnitureService,
    private readonly utils: UtilsService
  ) {}

  @ApiOkResponse({
    isArray: true,
    type: FurnitureRes
  })
  @Get()
  async findAll(
    @Query('type') type: string | undefined,
    @Query('room') room: string | undefined,
    @Query('material') material: string | undefined,
    @Query('brand') brand: string | undefined,
    @Query('sort') sort: string | undefined,
    @Query('price_from') priceFrom: string | undefined,
    @Query('price_to') priceTo: string | undefined
  ): Promise<IGetFurnitureRes> {
    const collectedBrands = brand ? brand.split(',') : null
    const criteria = {
      where: {
        type: {},
        room: {},
        material: {},
        brand: {}
      }
    }

    if (type) {
      criteria.where.type = {
        equals: type
      }
    }

    if (room) {
      criteria.where.room = {
        equals: room
      }
    }

    if (material) {
      criteria.where.material = {
        equals: material
      }
    }
    if (collectedBrands && collectedBrands.length) {
      criteria.where.brand = {
        in: collectedBrands
      }
    }

    const isThereAnyCriteria = Object.values(criteria.where).some((props) => {
      return Object.keys(props).length > 0
    })

    const { filtered, all } = await this.furnitureService.findMany(isThereAnyCriteria ? criteria : undefined)
    let filteredByPrice = filtered

    // at least one of them
    if (typeof priceFrom === 'string' || typeof priceTo === 'string') {
      filteredByPrice = filtered.filter((product) => {
        const formattedProductPrice = product.priceNew ? parseFloat(product.priceNew) : NaN
        if (isNaN(formattedProductPrice)) {
          return false
        }
        // both of them
        if (typeof priceFrom === 'string' && typeof priceTo === 'string') {
          return parseFloat(priceFrom) <= formattedProductPrice && parseFloat(priceTo) >= formattedProductPrice
        }

        if (typeof priceFrom === 'string' && typeof priceTo !== 'string') {
          return parseFloat(priceFrom) <= formattedProductPrice
        }

        if (typeof priceFrom !== 'string' && typeof priceTo === 'string') {
          return parseFloat(priceTo) >= formattedProductPrice
        }

        return false
      })
    }

    if (sort === 'asc') {
      filteredByPrice.sort((a, b) => {
        if (typeof a.priceNew === 'string' && typeof b.priceNew === 'string') {
          return parseFloat(a.priceNew) - parseFloat(b.priceNew)
        } else {
          return 0
        }
      })
    }
    if (sort === 'desc') {
      filteredByPrice.sort((a, b) => {
        if (typeof a.priceNew === 'string' && typeof b.priceNew === 'string') {
          return parseFloat(b.priceNew) - parseFloat(a.priceNew)
        } else {
          return 0
        }
      })
    }
    return { filtered: filteredByPrice, all: all }
  }

  @ApiOkResponse({
    schema: {
      $ref: getSchemaPath(FurnitureRes)
    }
  })
  @Get(':id')
  async findOne(@Param('id') id: string | undefined) {
    if (!id) {
      throw new BadRequestException('Id was not provided')
    }

    const furnitureItem = await this.furnitureService.findOne(parseInt(id))

    if (!furnitureItem) {
      throw new NotFoundException()
    }

    return furnitureItem
  }

  @ApiOkResponse(apiResponse200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileInterceptor('image'))
  @HttpCode(200)
  @Post()
  async create(
    @Body() dto: CreateFurnitureDto,
    @UploadedFile() uploadedImage: Express.Multer.File
  ): Promise<ICreateFurniture> {
    if (!uploadedImage) {
      throw new BadRequestException('Image was not provided')
    }

    const { status, deserializedDimensions } = this.utils.deserializeDimensionsFromString(dto.dimensions)

    if (!status) {
      throw new BadRequestException('Dimensions are not correct')
    }

    const deserializedSale = dto.sale === '1'
    const deserializedColors = dto.colors?.split(';') ?? []

    const furniture = {
      dimensions: deserializedDimensions,
      name: dto.name,
      type: dto.type,
      priceNew: dto.priceNew,
      priceOld: dto.priceOld,
      colors: deserializedColors,
      rating: dto.rating,
      sale: deserializedSale,
      room: dto.room,
      material: dto.material,
      brand: dto.brand,
      image: uploadedImage,
      specs: dto.specs,
      description: dto.description
    }

    await this.furnitureService.create(furniture)
    return { success: true }
  }
}
