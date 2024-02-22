import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
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
import { PrismaService } from '../prisma/prisma.service'
import { UtilsService } from '../utils/utils.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiExtraModels, ApiOkResponse, ApiTags, getSchemaPath } from '@nestjs/swagger'

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
    private readonly prisma: PrismaService,
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
    @Query('material') material: string | undefined
  ) {
    const criteria = {
      where: {
        type: {},
        room: {},
        material: {}
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

    const filtered = await this.furnitureService.findMany(criteria)
    const all = await this.furnitureService.findAll()
    // const findCriteria = Object.keys(req.query).reduce((accum, key) => {
    //   if (key === 'color' || key === 'sort') return accum;
    //     return {...accum, [this.mappedValues[key]]: req.query[key]};
    // }, {});

    // switch (req.query.sort) {
    //   case 'asc':
    //     furnitureItems = await Furniture.find(findCriteria).sort({ priceNew: 1 });
    //     break;
    //   case 'desc':
    //     furnitureItems = await Furniture.find(findCriteria).sort({ priceNew: -1 });
    //     break;
    //   case 'pop':
    //     furnitureItems = await Furniture.find(findCriteria).sort({ rating: -1 });
    //     break;
    //   default:
    //     furnitureItems = await Furniture.find(findCriteria);
    //     break;
    //   }

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
  async create(@Body() dto: CreateFurnitureDto, @UploadedFile() uploadedImage: Express.Multer.File) {
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

  @ApiOkResponse(apiResponse200)
  @HttpCode(200)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (!id) {
      throw new BadRequestException()
    }

    const processedId = parseInt(id)

    if (Number.isNaN(processedId)) {
      throw new BadRequestException('Incorrect id was provided')
    }
    await this.prisma.furniture.delete({
      where: {
        id: processedId
      }
    })

    return { success: true }
  }
}