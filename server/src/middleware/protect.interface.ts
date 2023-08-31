import { NextFunction, Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'

export type ProtectorValidaionReturnType = Promise<void | Response<
  { message: string },
  Record<string, unknown>
>>

export interface IProtector {
  checkAuthorization: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => ProtectorValidaionReturnType
}

export interface UncodedPayload extends JwtPayload {
  id?: string
  email?: string
  password?: string
}
