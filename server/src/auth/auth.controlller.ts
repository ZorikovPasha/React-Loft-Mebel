import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  BadRequestException,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { User as IUser } from '@prisma/client';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import {
  BadRequestRes,
  InternalErrorRes,
  SuccessfullRes,
  UnauthorizedRes,
  apiResponse200,
  apiResponse401,
  apiResponse500,
  registerUserApiResponse400,
} from './dto/auth.dto';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);

@ApiTags('Authorization')
@ApiExtraModels(SuccessfullRes)
@ApiExtraModels(BadRequestRes)
@ApiExtraModels(UnauthorizedRes)
@ApiExtraModels(InternalErrorRes)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Register user' })
  @ApiOkResponse(apiResponse200)
  @ApiResponse(registerUserApiResponse400)
  @ApiInternalServerErrorResponse(apiResponse500)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { userName, email, password } = createUserDto;

    const candidate = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { userName: userName }],
      },
    });

    if (candidate) {
      throw new BadRequestException('User already exists');
    }

    await this.userService.create({
      userName,
      email,
      password,
    });
    return { success: true };
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user' })
  @ApiUnauthorizedResponse(apiResponse401)
  @ApiOkResponse(apiResponse200)
  @ApiResponse(apiResponse500)
  @Post('login')
  async login(@User() user: IUser) {
    return this.authService.login(user);
  }
}
