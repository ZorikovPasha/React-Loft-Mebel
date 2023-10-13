import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Res,
  UsePipes,
  BadRequestException,
  UseGuards,
  HttpCode,
  Req,
  InternalServerErrorException
} from '@nestjs/common'
import { User as IUser } from '@prisma/client'
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger'

import { AuthService } from '../auth/auth.service'
import { UserService } from '../user/user.service'
import { CreateUserDto } from '../user/dto/create-user.dto'
import { PrismaService } from '../prisma/prisma.service'
import { LocalAuthGuard } from '../auth/local-auth.guard'
import {
  BadRequestRes,
  InternalErrorRes,
  SuccessfullRes,
  UnauthorizedRes,
  apiResponse200,
  apiResponse401,
  apiResponse500,
  registerUserApiResponse400
} from './dto/auth.dto'
import { YandexAuthGuard } from './yandex-auth.guard'
import { Response, Request } from 'express'

interface IRequestWithUser extends Request {
  user: {
    provider: 'yandex'
    id: string
    username: string
    displayName: string
    name: { familyName: string; givenName: string } | null // { familyName: 'Павел', givenName: 'Зориков' }
    gender: null
    emails: [{ value: string }] | null
    photos:
      | [
          {
            value: string // url
            type: 'thumbnail' | string
          } | null
        ]
      | null
    _raw: string
    _json: {
      id: string
      login: string
      client_id: string
      display_name: string
      real_name: string
      first_name: string // 'Павел',
      last_name: string // 'Зориков'
      sex: null | string
      default_email: string
      emails: string[]
      default_avatar_id: string
      is_avatar_empty: boolean
      default_phone: null | string
      psuid: string
    }
  }
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})

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
    private readonly authService: AuthService
  ) {}

  @ApiOperation({ summary: 'Register user' })
  @ApiOkResponse(apiResponse200)
  @ApiResponse(registerUserApiResponse400)
  @ApiInternalServerErrorResponse(apiResponse500)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const { userName, email, password } = createUserDto

    const candidate = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { userName: userName }]
      }
    })

    if (candidate) {
      throw new BadRequestException('User already exists')
    }

    await this.userService.create({
      userName,
      email,
      password
    })
    return { success: true }
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user' })
  @ApiUnauthorizedResponse(apiResponse401)
  @ApiOkResponse(apiResponse200)
  @ApiResponse(apiResponse500)
  @Post('login')
  async login(@User() user: IUser) {
    return this.authService.login(user)
  }

  @UseGuards(YandexAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user via yandex' })
  @ApiUnauthorizedResponse(apiResponse401)
  @ApiOkResponse(apiResponse200)
  @ApiResponse(apiResponse500)
  @Get('login/yandex')
  async loginViaYandex() {
    console.log('__this is not gonna be called (loginViaYandex)')
    return {}
  }

  @UseGuards(YandexAuthGuard)
  @Get('login/yandex/callback')
  async loginViaYandexCallback(@Req() req: IRequestWithUser, @Res() res: Response) {
    try {
      await this.userService.create({
        userName: req.user.username,
        email: req.user._json.default_email,
        password: '',
        name: req.user.name?.familyName,
        surname: req.user.name?.givenName
      })
    } catch (error) {
      // console.log('catching error', error);

      const thisUser = await this.userService.findByEmail(req.user._json.default_email)
      if (thisUser) {
        const token = this.authService.generateToken(thisUser.email, thisUser.id)
        return res.redirect(`http://localhost:5173/profile?token=${token}`)
      }

      throw new InternalServerErrorException()
    }
  }
}
