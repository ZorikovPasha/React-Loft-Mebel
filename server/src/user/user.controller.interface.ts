import { NextFunction, Request, Response } from 'express'
import { User } from '@prisma/client'

export interface IRegisterUserDto {
  userName?: string | unknown | null
  email?: string | unknown | null
  password?: string | unknown | null
}

export interface ILoginUserDto {
  email?: string | unknown | null
  password?: string | unknown | null
}

export interface IUpdateUserDto {
  name: string | undefined | null
  surname: string | undefined | null
  email: string | undefined | null
  phone: string | undefined | null
  city: string | undefined | null
  street: string | undefined | null
  house: string | undefined | null
  apartment: string | undefined | null
  emailConfirmed: boolean | undefined | null
  wantsToReceiveEmailUpdates: string | undefined | null
}

interface IAppLocals {
  user: User | undefined
}

export interface IAddCartItemDto {
  productId?: number
  quintity?: number
  color?: string
}

export interface IRemoveCartItemDto {
  productId?: number
  color?: string
}

export interface ICancelOrderDto {
  orderId: number
}

export interface AppResponse extends Response {
  locals: IAppLocals
}

export type ResponseType = Promise<void | Response<Record<string, string>, Record<string, unknown>>>

export type AppLocalsResponseType = Promise<void | Response<Record<string, string>, IAppLocals>>

export interface IRequestDto {
  message: string | unknown | undefined | null
}

export interface IMakeReviewDto {
  score: number | unknown | undefined
  text: string | unknown | undefined
  furnitureId: string | unknown | undefined
}

export interface IUserController {
  register: (
    req: Request<{}, {}, IRegisterUserDto>,
    res: Response,
    next: NextFunction
  ) => Promise<void | Response>

  login: (req: Request<{}, {}, ILoginUserDto>, res: Response, next: NextFunction) => void

  updateUserData: (req: Request<{}, {}, IUpdateUserDto>, res: Response, next: NextFunction) => void

  getUserData: (req: Request, res: Response, next: NextFunction) => void

  getFavorites: (req: Request, res: AppResponse, next: NextFunction) => void

  getCartItems: (req: Request, res: AppResponse, next: NextFunction) => void

  addCartItem: (req: Request<{}, {}, IAddCartItemDto>, res: AppResponse, next: NextFunction) => void

  removeCartItem: (
    req: Request<{}, {}, IRemoveCartItemDto>,
    res: AppResponse,
    next: NextFunction
  ) => void

  addOrder: (req: Request, res: AppResponse, next: NextFunction) => void

  addFavoriteItem: (
    req: Request<{}, {}, { id?: number }>,
    res: Response,
    next: NextFunction
  ) => void

  deleteFavouriteItem: (
    req: Request<{}, {}, { id?: number }>,
    res: Response,
    next: NextFunction
  ) => void
}
