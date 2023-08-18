import jwt from 'jsonwebtoken'
import type { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

import { prismaClient } from '../prisma/client.js'
import { ApiError } from '../error/api.error.js'

interface UncodedPayload extends JwtPayload {
  id?: string
  email?: string
  password?: string
}

type ReturnType = Promise<void | Response<
  {
    message: string
  },
  Record<string, unknown>
>>

export const protect = async (req: Request, res: Response, next: NextFunction): ReturnType => {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
    return ApiError.notAuthorized(res, 'Not authorized')
  }

  const token = req.headers.authorization.split(' ')[1]

  if (!token) {
    return ApiError.notAuthorized(res, 'Token was not provided')
  }

  try {
    const uncodedPayload = jwt.verify(token, process.env.JWT_SECRET ?? '') as UncodedPayload

    const user = await prismaClient.user.findFirst({
      where: {
        id: uncodedPayload.id
      }
    })
    if (!user) {
      return ApiError.notAuthorized(res, 'User was not found')
    }
    res.locals.user = user
    next()
  } catch (error) {
    // TODO: should add logging in protect
    return next(ApiError.internal(error as Error))
  }
}
