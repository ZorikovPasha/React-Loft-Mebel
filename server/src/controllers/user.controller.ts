import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import type { UploadedFile } from 'express-fileupload'

import { LoggerService } from '../logger/logger.service.js'
import { ApiError } from '../error/api.error.js'
import { prismaClient } from '../prisma/client.js'

const generateToken = (id: string, email: string, password: string) => {
  const payload = {
    id,
    email,
    password
  }

  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    return
  }

  return jwt.sign(payload, jwtSecret ?? '', { expiresIn: process.env.JWT_EXPIRATION })
}

interface ILoginRequestBody {
  email?: string
  password?: string
}

interface IRequestBody {
  userName?: string
  email?: string
  password?: string
}

interface IUpdateUserDto {
  name: string | undefined | null
  surname: string | undefined | null
  email: string | undefined | null
  phone: string | undefined | null
  city: string | undefined | null
  street: string | undefined | null
  house: string | undefined | null
  apartment: string | undefined | null
  photo: string | undefined | null
  emailConfirmed: boolean | undefined | null
  wantsToReceiveEmailUpdates: boolean | undefined | null
}

// interface IValidationError {
//   value: string | number | undefined
//   msg: string | undefined
//   param: string
//   location: "body" | string
// }

// interface IValidationResult {
//   formatter: () => void
//   errors: IValidationError[]
// }

class UserController {
  private logger: LoggerService
  constructor(logger: LoggerService) {
    this.logger = logger
  }

  async register(req: Request<{}, {}, IRequestBody>, res: Response, next: NextFunction) {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)
      const errors = validationResult(req)
      console.log('errors', errors)

      /* @ts-ignore */
      if (errors.errors.length) {
        /* @ts-ignore */
        return res.json(errors.errors).status(400)
        // return next(ApiError.badRequest('An error occured'), {})
      }
      const { userName, email, password } = req.body

      if (!userName) {
        return next(ApiError.badRequest('UserName was not provided'))
      }

      if (!email) {
        return next(ApiError.badRequest('Email was not provided'))
      }

      if (!password) {
        return next(ApiError.badRequest('Password was not provided'))
      }
      const candidate = await prismaClient.user.findFirst({
        where: {
          email: email
        }
      })

      if (candidate) {
        return next(ApiError.badRequest('User already exists'))
      }

      const hashedPassword = bcrypt.hashSync(password, 10)

      await prismaClient.user.create({
        data: {
          name: '',
          surname: '',
          userName,
          password: hashedPassword,
          phone: '',
          email,
          city: '',
          street: '',
          house: '',
          apartment: '',
          photo: Buffer.alloc(0)
        }
      })
      res.status(201).json({ message: 'User has been registered' })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async login(req: Request<{}, {}, ILoginRequestBody>, res: Response, next: NextFunction) {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const { email, password } = req.body

      if (!password) {
        return next(ApiError.badRequest('Password was not provided'))
      }

      if (!email) {
        return next(ApiError.badRequest('Email was not provided'))
      }

      const user = await prismaClient.user.findFirst({
        where: {
          email: email
        }
      })
      if (!user) {
        return ApiError.badRequest(`User with email ${email} has not found`)
      }

      const isValidPassword = bcrypt.compareSync(password, user.password)
      if (!isValidPassword) {
        return ApiError.badRequest('Provided password incorrect')
      }

      const token = generateToken(user.id, email, password)

      return res.json({ token: token })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return ApiError.internal(error as Error)
    }
  }

  // async confirmAuth(req: Request, res: Response) {
  //   if (req.user) { // ??
  //     res.status(200).json({ message: "Token is valid" })
  //   }
  // }

  async updateUserData(req: Request<{}, {}, IUpdateUserDto>, res: Response, next: NextFunction) {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const {
        name,
        surname,
        phone,
        city,
        street,
        house,
        apartment,
        emailConfirmed,
        wantsToReceiveEmailUpdates
      } = req.body

      console.log('req.body', req.body)

      // filename: req.files.file.name,
      // content: req.files.file.data

      const photo = req.files && req.files.photo
      console.log('req.files.photo', photo)

      const set: Record<string, UploadedFile | string | boolean | undefined> = {}
      if (name !== null && typeof name !== 'undefined') {
        set.name = name
      }
      if (surname !== null && typeof surname !== 'undefined') {
        set.surname = surname
      }
      if (phone !== null && typeof phone !== 'undefined') {
        set.phone = phone
      }
      if (city !== null && typeof city !== 'undefined') {
        set.city = city
      }
      if (street !== null && typeof street !== 'undefined') {
        set.street = street
      }
      if (house !== null && typeof house !== 'undefined') {
        set.house = house
      }
      if (apartment !== null && typeof apartment !== 'undefined') {
        set.apartment = apartment
      }
      if (emailConfirmed !== null && typeof emailConfirmed !== 'undefined') {
        set.emailConfirmed = emailConfirmed
      }
      if (wantsToReceiveEmailUpdates !== null) {
        set.wantsToReceiveEmailUpdates = wantsToReceiveEmailUpdates
      }
      // if (photo !== null && typeof photo !== "undefined" && !Array.isArray(photo))  {
      //   set.photo = photo
      // }

      console.log('set', set)

      await prismaClient.user.update({
        where: {
          email: res.locals.user.email
        },
        data: {
          ...set
        }
      })
      res.status(204).json({ message: 'Data successfully was written' })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async getUserData(req: Request, res: Response, next: NextFunction) {
    this.logger.log(`[${req.method}] ${req.path}`)

    try {
      const {
        name,
        surname,
        userName,
        email,
        phone,
        city,
        street,
        house,
        apartment,
        photo,
        emailConfirmed,
        createdAt,
        orders,
        favorites
      } = res.locals.user
      console.log('res.locals.user', res.locals.user)

      res.json({
        name,
        surname,
        userName,
        email,
        phone,
        city,
        street,
        house,
        apartment,
        photo,
        emailConfirmed,
        createdAt,
        orders,
        favorites
      })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }
}

export const userController = new UserController(new LoggerService())
