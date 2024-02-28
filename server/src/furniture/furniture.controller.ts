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
// import { PrismaService } from '../prisma/prisma.service'
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
    // private readonly prisma: PrismaService,
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
    @Query('sort') sort: string | undefined
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

    const [filtered, all] = await Promise.all([
      this.furnitureService.findMany(criteria),
      this.furnitureService.findAll()
    ])

    if (sort === 'asc') {
      filtered.sort((a, b) => {
        return parseFloat(a.priceNew) - parseFloat(b.priceNew)
      })
      all.sort((a, b) => {
        return parseFloat(a.priceNew) - parseFloat(b.priceNew)
      })
    }
    if (sort === 'desc') {
      filtered.sort((a, b) => {
        return parseFloat(b.priceNew) - parseFloat(a.priceNew)
      })
      all.sort((a, b) => {
        return parseFloat(b.priceNew) - parseFloat(a.priceNew)
      })
    }
    return { filtered: filtered, all: all }
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

  // @ApiOkResponse(apiResponse200)
  // @HttpCode(200)
  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   if (!id) {
  //     throw new BadRequestException()
  //   }

  //   const processedId = parseInt(id)

  //   if (Number.isNaN(processedId)) {
  //     throw new BadRequestException('Incorrect id was provided')
  //   }
  //   await this.prisma.furniture.delete({
  //     where: {
  //       id: processedId
  //     }
  //   })

  //   return { success: true }
  // }
}
