import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, Profile } from 'passport-yandex'
// import { AuthService } from "./auth.service";
// import { UserService } from "src/user/user.service";

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor() {
    // private authService: AuthService, private userService: UserService
    super(
      {
        clientID: process.env.YANDEX_CLIENT_ID,
        clientSecret: process.env.YANDEX_CLIENT_SECRET,
        callbackURL: 'http://localhost:3478/auth/login/yandex/callback'
      },

      (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: (error: string | null, user: Record<string, unknown>) => void
      ) => {
        return done(null, profile)
      }
    )
  }

  async validate() {
    console.log('validate')
  }
}
