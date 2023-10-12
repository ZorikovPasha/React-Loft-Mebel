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
  UseGuards,
} from '@nestjs/common';
import { User as IUser } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

import { UserService } from './user.service';
import {
  AddCartItemDto,
  AddFavoriteFurnitureDto,
  EditOrderDto,
  MakeReviewDto,
  RemoveCartItemDto,
  UpdateUserDto,
  UserRequestDto,
} from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserData(@Request() req: Request, @User() user: IUser) {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!foundUser) {
      return new NotFoundException();
    }

    return {
      user: await this.userService.collectUserData(foundUser),
    };
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @Put()
  async updateUserData(
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() image: Express.Multer.File | null,
    @User() user: IUser,
  ) {
    let hasAnyFieldsToUpdate = false;
    const dataToUpdate: Record<string, string | number | boolean> = {};

    Object.entries(updateUserDto).forEach(([key, value]) => {
      if (typeof value !== 'undefined' && value !== null) {
        hasAnyFieldsToUpdate = true;

        if (key === 'wantsToReceiveEmailUpdates') {
          dataToUpdate[key] = value === '1';
        }
        dataToUpdate[key] = value;
      }
    });

    if (!hasAnyFieldsToUpdate) {
      throw new BadRequestException('Nothing to update');
    }

    await this.userService.updateUser(user.id, dataToUpdate, image);
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('favorites')
  async getFavorites(@User() user: IUser) {
    const favorites = await this.userService.getUserFavorites(user.id);
    return { items: favorites };
  }

  @UseGuards(JwtAuthGuard)
  @Post('favorites')
  async addFavoriteItem(
    @Body() dto: AddFavoriteFurnitureDto,
    @User() user: IUser,
  ) {
    const { id } = dto; // this is product id

    const candidate = await this.userService.findFavoriteFurniture(user.id, id);

    if (candidate) {
      throw new BadRequestException('Item already exists');
    }

    await this.userService.addFavoriteFurnitureItem(user.id, id);
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('favorites')
  async deleteFavouriteItem(
    @Body() dto: AddFavoriteFurnitureDto,
    @User() user: IUser,
  ) {
    const { id } = dto;

    await this.userService.deleteFavoriteFurniture(user.id, id);
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('orders')
  async getOrders(@User() user: IUser) {
    const orders = await this.userService.getOrders(user.id);
    return { orders: orders };
  }

  @UseGuards(JwtAuthGuard)
  @Post('orders')
  async addOrder(@User() user: IUser) {
    const dto = await this.userService.makeOrder(user.id);
    if (!dto) {
      throw new BadRequestException('User has not cart');
    }

    return dto;
  }

  @HttpCode(204)
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(JwtAuthGuard)
  @Put('orders')
  async cancelOrder(@Body() dto: EditOrderDto) {
    const { orderId } = dto;

    await this.userService.updateOrder(orderId, { status: 'CANCELED' });
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @Get('cart')
  async getCartItems(@User() user: IUser) {
    const dto = await this.userService.getCartItems(user.id);
    if (!dto) {
      return { items: [] };
    }

    return dto;
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('cart')
  async addCartItem(@Body() dto: AddCartItemDto, @User() user: IUser) {
    await this.userService.addCartItem({
      userId: user.id,
      quintity: dto.quintity,
      color: dto.color,
      productId: dto.productId,
    });

    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete('cart')
  async removeCartItem(@Body() dto: RemoveCartItemDto, @User() user: IUser) {
    await this.userService.deleteCartItem({
      color: dto.color,
      userId: user.id,
      productId: dto.productId,
    });

    return { success: true };
  }

  @HttpCode(200)
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('request')
  makeRequest(@Body() dto: UserRequestDto) {
    console.log('data.message', dto.message);
    return { success: true };
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('attachments'))
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('reviews')
  async makeReview(
    @Body() dto: MakeReviewDto,
    @UploadedFile() attachments: Express.Multer.File | null,
    @User() user: IUser,
  ) {
    console.log('attachments', attachments);

    await this.userService.makeReview({
      userId: user.id,
      text: dto.text,
      score: dto.score,
      furnitureId: dto.furnitureId,
      attachments: attachments,
    });

    return { success: true };
  }
}
