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
  ForbiddenException,
  UnauthorizedException
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
import { JwtAuthGuard } from './jwt-auth.guard'
import { IUserPayload } from './jwt.strategy'
import { IAccessTokenRegenRes, ILoginRes, ILogoutRes, IRegisterRes } from './types'

interface IRequestWithUser extends Request {
  user: {
    provider: 'yandex'
    id: string
    username: string
    displayName: string
    name: { familyName: string; givenName: string } | null
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
  async register(@Body() createUserDto: CreateUserDto): Promise<IRegisterRes> {
    const { userName, email, password } = createUserDto

    const candidate = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { userName: userName }]
      }
    })

    if (candidate) {
      throw new BadRequestException('User with this email already exists') // 422
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
  async login(@User() user: IUser, @Res({ passthrough: true }) res: Response): Promise<ILoginRes> {
    const { accessToken, refreshToken, userData } = await this.authService.login(user)

    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })
    return {
      token: accessToken,
      user: userData
    }
  }

  @UseGuards(YandexAuthGuard)
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user via yandex' })
  @ApiUnauthorizedResponse(apiResponse401)
  @ApiOkResponse(apiResponse200)
  @ApiResponse(apiResponse500)
  @Get('login/yandex')
  async loginViaYandex() {
    return {}
  }

  @UseGuards(YandexAuthGuard)
  @Get('login/yandex/callback')
  async loginViaYandexCallback(@Req() req: IRequestWithUser, @Res() res: Response) {
    const candidate = await this.userService.findByEmail(req.user._json.default_email)
    if (candidate) {
      const { accessToken, refreshToken } = await this.authService.login(candidate)
      res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })
      return res.redirect(`${process.env.FRONT}/login-finish?accessToken=${accessToken}`)
    }
    const newUser = await this.userService.create({
      userName: req.user.username,
      email: req.user._json.default_email,
      password: '',
      name: req.user.name?.familyName,
      surname: req.user.name?.givenName
    })
    const { accessToken, refreshToken } = await this.authService.login(newUser)
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })
    return res.redirect(`${process.env.FRONT}/login-finish?accessToken=${accessToken}`)
  }

  // @UseGuards(JwtAuthGuard)
  @ApiOkResponse(apiResponse200)
  @ApiResponse(apiResponse500)
  @Get('refresh')
  async refreshAccessToken(
    @Req() request: Request,
    @Res({ passthrough: true }) res: Response
  ): Promise<IAccessTokenRegenRes> {
    const jwtFromCookie = request.cookies.jwt
    if (!jwtFromCookie) {
      throw new UnauthorizedException()
    }
    const currentUser = await this.prisma.user.findFirst({
      where: {
        refreshToken: jwtFromCookie
      }
    })
    if (!currentUser) {
      throw new ForbiddenException()
    }

    const { accessToken, refreshToken } = await this.authService.login(currentUser)
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 })

    return { token: accessToken }
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(204)
  @ApiOperation({ summary: 'Log user out' })
  @ApiOkResponse(apiResponse200)
  @ApiResponse(apiResponse500)
  @Get('logout')
  async logout(@User() user: IUserPayload, @Res({ passthrough: true }) res: Response): Promise<ILogoutRes> {
    await this.prisma.user.update({
      where: {
        id: user.sub
      },
      data: {
        refreshToken: ''
      }
    })

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
    return { success: true }
  }
}
