import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'
import type { UploadedFile } from 'express-fileupload'
import { injectable, inject } from 'inversify'
import sizeOf from 'buffer-image-size'
import sharp from 'sharp'

import { LoggerService } from '../logger/logger.service.js'
import { ApiError } from '../error/api.error.js'
import { prismaClient } from '../prisma/client.js'
import { TYPES } from '../types.js'
import {
  ILoginUserDto,
  IRegisterUserDto,
  IUpdateUserDto,
  IUserController,
  ResponseType
} from './user.controller.interface.js'
import fileUpload from 'express-fileupload'
import { AppLocalsResponseType, AppResponse } from '../app/app.controller.interface.js'

const generateToken = (id: string, email: string, password: string): string | undefined => {
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

@injectable()
export class UserController implements IUserController {
  constructor(@inject(TYPES.ILoggerService) private logger: LoggerService) {
    this.logger = logger
  }

  async register(
    req: Request<{}, {}, IRegisterUserDto>,
    res: Response,
    next: NextFunction
  ): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)
      const errors = validationResult(req)
      console.log('errors', errors)

      // if (errors.errors.length) {
      //   return res.json(errors.errors).status(400)
      //   // return next(ApiError.badRequest('An error occured'), {})
      // }
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

      const hashedPassword = await bcrypt.hash(password, 10)

      let savedImage
      if (req.files && req.files.photo) {
        let processedImageFromRequest: fileUpload.UploadedFile

        if (Array.isArray(req.files.photo)) {
          processedImageFromRequest = req.files.photo[0]
        } else {
          processedImageFromRequest = req.files.photo
        }

        const imageDimensions = sizeOf(processedImageFromRequest.data)
        console.log('imageDimensions', imageDimensions)

        const compressedImage = await sharp(processedImageFromRequest.data).toBuffer()

        const imageNameWithoutExtension = processedImageFromRequest.name.split('.').slice(0, -1)
        const imageExtension = processedImageFromRequest.name.split('.').pop()
        const photo = {
          name: processedImageFromRequest.name,
          alternativeText: '',
          caption: '',
          width: imageDimensions.width,
          height: imageDimensions.height,
          hash: processedImageFromRequest.md5,
          ext: imageExtension ?? '',
          mime: processedImageFromRequest.mimetype,
          size: processedImageFromRequest.size / 1000,
          url: `${process.env.SELF}/uploads/${imageNameWithoutExtension}_${processedImageFromRequest.md5}.${imageExtension}`,
          provider: 'database',
          data: compressedImage
        }

        savedImage = await prismaClient.image.create({
          data: photo
        })
      }

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
          photoId: savedImage?.id
        }
      })
      return res.status(201).json({ success: true })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async login(
    req: Request<{}, {}, ILoginUserDto>,
    res: Response,
    next: NextFunction
  ): ResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

      const { email, password } = req.body

      if (!password) {
        return res
          .status(400)
          .json({ errors: [{ field: 'password', message: 'Password was not provided' }] })
      }

      if (!email) {
        return res
          .status(400)
          .json({ errors: [{ field: 'email', message: 'Email was not provided' }] })
      }

      const user = await prismaClient.user.findFirst({
        where: {
          email: email
        }
      })
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ field: 'email', message: `User with email ${email} has not found` }] })
      }

      const isValidPassword = bcrypt.compareSync(password, user.password)
      if (!isValidPassword) {
        return res
          .status(400)
          .json({ errors: [{ field: 'password', message: `Provided password is incorrect` }] })
      }

      const token = generateToken(user.id, email, password)

      return res.json({ token: token })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  // async confirmAuth(req: Request, res: Response) {
  //   if (req.user) { // ??
  //     res.status(200).json({ message: "Token is valid" })
  //   }
  // }

  async updateUserData(
    req: Request<{}, {}, IUpdateUserDto>,
    res: Response,
    next: NextFunction
  ): ResponseType {
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
        data: set
      })
      return res.status(204).json({ success: true })
    } catch (error) {
      this.logger.error(`${req.method} [${req.path}], Error 500 : ${error}`)
      return next(ApiError.internal(error as Error))
    }
  }

  async getUserData(req: Request, res: AppResponse, next: NextFunction): AppLocalsResponseType {
    try {
      this.logger.log(`[${req.method}] ${req.path}`)

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
      } = res.locals.user || {}
      console.log('res.locals.user', res.locals.user)

      return res.json({
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
