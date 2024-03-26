import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Param
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
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { IUserPayload } from '../auth/jwt.strategy'
import { ApiTags } from '@nestjs/swagger'
import { FurnitureService } from '../furniture/furniture.service'
import {
  IAddCartItemRes,
  IAddFavoriteItemRes,
  IAddOrderRes,
  ICancelOrderRes,
  IDeleteFavouriteItemRes,
  IGetOrdersRes,
  IGetUSerDataRes,
  IMakeRequestRes,
  IMakeReviewRes,
  IRemoveCartItemRes,
  IThisReviewWasHelpfulRes,
  IUpdateUserRes
} from './types'

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly furnitureService: FurnitureService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserData(@User() user: IUserPayload): Promise<IGetUSerDataRes> {
    const candidate = await this.userService.findByEmail(user.email)
    if (candidate) {
      return { user: await this.userService.collectUserData(candidate) }
    } else {
      throw new BadRequestException('User not found')
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @Put()
  async updateUserData(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File | null,
    @User() user: IUserPayload
  ): Promise<IUpdateUserRes> {
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
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('favorites')
  async addFavoriteItem(
    @Body() dto: AddFavoriteFurnitureDto,
    @User() user: IUserPayload
  ): Promise<IAddFavoriteItemRes> {
    const { id } = dto // this is product id
    const candidate = await this.userService.findFavoriteFurniture(user.sub, id)
    if (candidate) {
      return { success: true }
    }

    await this.userService.addFavoriteFurnitureItem(user.sub, id)
    return { success: true }
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  @Delete('favorites')
  async deleteFavouriteItem(
    @Body() dto: AddFavoriteFurnitureDto,
    @User() user: IUserPayload
  ): Promise<IDeleteFavouriteItemRes> {
    const { id } = dto

    await this.userService.deleteFavoriteFurniture(user.sub, id)
    return { success: true }
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders')
  async getOrders(@User() user: IUserPayload): Promise<IGetOrdersRes> {
    const orders = await this.userService.getOrders(user.sub)
    return { orders: orders }
  }

  @UseGuards(JwtAuthGuard)
  @Post('orders')
  async addOrder(@User() user: IUserPayload): Promise<IAddOrderRes> {
    const dto = await this.userService.makeOrder(user.sub)
    if (!dto) {
      throw new BadRequestException('User has no cart')
    }

    return dto
  }

  @HttpCode(200)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  @Put('orders')
  async cancelOrder(@Body() dto: EditOrderDto): Promise<ICancelOrderRes> {
    const { orderId } = dto

    await this.userService.updateOrder(orderId, { status: 'CANCELED' })
    return { success: true }
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('cart')
  async addCartItem(@Body() dto: AddCartItemDto, @User() user: IUserPayload): Promise<IAddCartItemRes> {
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
  async removeCartItem(@Body() dto: RemoveCartItemDto, @User() user: IUserPayload): Promise<IRemoveCartItemRes> {
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
  makeRequest(@Body() dto: UserRequestDto): IMakeRequestRes {
    console.log(dto)

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
  ): Promise<IMakeReviewRes> {
    await Promise.all([
      this.userService.makeReview({
        userId: user.sub,
        text: dto.text,
        score: dto.score,
        furnitureId: parseInt(dto.furnitureId),
        attachments: attachments
      }),
      this.furnitureService.recalculateFurnitureScore(parseInt(dto.furnitureId))
    ])

    return { success: true }
  }

  @UseGuards(JwtAuthGuard)
  @Put('reviews/:id')
  async updateReview(
    @Param('id') reviewId: string | undefined,
    @User() user: IUserPayload
  ): Promise<IThisReviewWasHelpfulRes> {
    if (typeof reviewId === 'undefined') {
      throw new BadRequestException('Review d was not provided')
    }

    const reviewWasHelpful = await this.userService.updateReview(Number(reviewId), user.sub)
    if (typeof reviewWasHelpful === 'undefined') {
      throw new BadRequestException()
    }
    return { wasHelpfull: reviewWasHelpful }
  }
}
