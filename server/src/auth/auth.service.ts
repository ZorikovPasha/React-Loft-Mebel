import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email)
    if (!user) {
      return null
    }

    const isValidPassword = bcrypt.compareSync(pass, user.password)
    if (!isValidPassword) {
      return null
    }

    const result: Record<string, unknown> = {}
    Object.entries(user).forEach(([key, value]) => {
      if (key === 'password') {
        return
      }

      result[key] = value
    })
    return result
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.id }
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '1h'
    })
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '1d'
    })

    await this.prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        refreshToken: refreshToken
      }
    })

    return {
      accessToken: accessToken,
      refreshToken,
      userData: await this.userService.collectUserData(user)
    }
  }
}
