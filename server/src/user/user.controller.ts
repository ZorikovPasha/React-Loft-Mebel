import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  Request,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  UseGuards
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { UserService } from './user.service'
import {
  AddCartItemDto,
  AddFavoriteFurnitureDto,
  EditOrderDto,
  MakeReviewDto,
  RemoveCartItemDto,
  UpdateUserDto,
  UserRequestDto
} from './dto/create-user.dto'
import { PrismaService } from '../prisma/prisma.service'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { IUserPayload } from '../auth/jwt.strategy'
import { ApiTags } from '@nestjs/swagger'

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserData(@Request() req: Request, @User() user: IUserPayload) {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        id: user.sub
      }
    })

    if (!foundUser) {
      return new NotFoundException()
    }

    return {
      user: await this.userService.collectUserData(foundUser)
    }
  }

  @UseGuards(JwtAuthGuard)
  // @HttpCode(204)
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @Put()
  async updateUserData(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File | null,
    @User() user: IUserPayload
  ) {
    let hasAnyFieldsToUpdate = false
    const dataToUpdate: Record<string, string | number | boolean> = {}
    Object.entries(updateUserDto).forEach(([key, value]) => {
      if (typeof value !== 'undefined' && value !== null) {
        hasAnyFieldsToUpdate = true

        if (key === 'wantsToReceiveEmailUpdates') {
          dataToUpdate[key] = value === '1'
          dataToUpdate.DecidedOnWantsToReceiveEmailUpdates = true
        } else {
          dataToUpdate[key] = value
        }
      }
    })

    if (!hasAnyFieldsToUpdate) {
      throw new BadRequestException('Nothing to update')
    }

    await this.userService.updateUser(user.sub, dataToUpdate, image)
    return { success: true }
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async getFavorites(@User() user: IUserPayload) {
    const favorites = await this.userService.getUserFavorites(user.sub)
    return { items: favorites }
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorites')
  async addFavoriteItem(@Body() dto: AddFavoriteFurnitureDto, @User() user: IUserPayload) {
    const { id } = dto // this is product id

    const candidate = await this.userService.findFavoriteFurniture(user.sub, id)

    if (candidate) {
      throw new BadRequestException('Item already exists')
    }

    await this.userService.addFavoriteFurnitureItem(user.sub, id)
    return { success: true }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorites')
  async deleteFavouriteItem(@Body() dto: AddFavoriteFurnitureDto, @User() user: IUserPayload) {
    const { id } = dto

    await this.userService.deleteFavoriteFurniture(user.sub, id)
    return { success: true }
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders')
  async getOrders(@User() user: IUserPayload) {
    const orders = await this.userService.getOrders(user.sub)
    return { orders: orders }
  }

  @UseGuards(JwtAuthGuard)
  @Post('orders')
  async addOrder(@User() user: IUserPayload) {
    const dto = await this.userService.makeOrder(user.sub)
    if (!dto) {
      throw new BadRequestException('User has not cart')
    }

    return dto
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  @Put('orders')
  async cancelOrder(@Body() dto: EditOrderDto) {
    const { orderId } = dto

    await this.userService.updateOrder(orderId, { status: 'CANCELED' })
    return { success: true }
  }

  @UseGuards(JwtAuthGuard)
  @Get('cart')
  async getCartItems(@User() user: IUserPayload) {
    const dto = await this.userService.getCartItems(user.sub)
    if (!dto) {
      return { items: [] }
    }

    return dto
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('cart')
  async addCartItem(@Body() dto: AddCartItemDto, @User() user: IUserPayload) {
    await this.userService.addCartItem({
      userId: user.sub,
      quintity: dto.quintity,
      color: dto.color,
      productId: dto.productId
    })
    return { success: true }
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete('cart')
  async removeCartItem(@Body() dto: RemoveCartItemDto, @User() user: IUserPayload) {
    await this.userService.deleteCartItem({
      color: dto.color,
      userId: user.sub,
      productId: dto.productId
    })

    return { success: true }
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('request')
  makeRequest(@Body() dto: UserRequestDto) {
    console.log('data.message', dto.message)
    return { success: true }
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('attachments'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('reviews')
  async makeReview(
    @Body() dto: MakeReviewDto,
    @UploadedFile() attachments: Express.Multer.File | null,
    @User() user: IUserPayload
  ) {
    await this.userService.makeReview({
      userId: user.sub,
      text: dto.text,
      score: dto.score,
      furnitureId: parseInt(dto.furnitureId),
      attachments: attachments
    })

    return { success: true }
  }
}
