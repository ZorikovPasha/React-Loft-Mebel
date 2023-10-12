import { Injectable } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email)
    console.log('user', user)
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
    console.log('login user', user)
    const payload = { email: user.email, sub: user.id }
    return {
      token: this.jwtService.sign(payload),
      user: await this.userService.collectUserData(user)
    }
  }
}
